import { isValidReadwiseArticle } from './filter';
import { ReadwiseArticle } from './types';

const token = process.env.READWISE_API_TOKEN || '';

export const fetchDocumentListApi = async (updatedAfter=null, location=null) => {
    let fullData: ReadwiseArticle[] = [];
    let nextPageCursor = null;

    while (true) {
      const queryParams = new URLSearchParams();
      if (nextPageCursor) {
        queryParams.append('pageCursor', nextPageCursor);
      }
      if (updatedAfter) {
        queryParams.append('updatedAfter', updatedAfter);
      }
      if (location) {
        queryParams.append('location', location);
      }
      console.log('Making export api request with params ' + queryParams.toString());
      const response = await fetch('https://readwise.io/api/v3/list/?' + queryParams.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const responseJson = await response.json();
      fullData.push(...responseJson['results']);
      nextPageCursor = responseJson['nextPageCursor'];
      if (!nextPageCursor) {
        break;
      }
    }

    console.log('items before filtering: ', fullData.length)

    console.log('filtering to only valid articles')

    const filteredData = fullData.filter((data) => isValidReadwiseArticle(data));

    console.log('number of articles: ', filteredData.length);

    return filteredData;
};
