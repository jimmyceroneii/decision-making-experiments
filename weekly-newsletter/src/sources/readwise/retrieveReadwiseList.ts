import { sendRequestWithRetry } from './retry';
import { ReadwiseArticle } from './types';

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
      const response = await sendRequestWithRetry<{ results: ReadwiseArticle[], nextPageCursor: string }>('https://readwise.io/api/v3/list/?' + queryParams.toString());
      fullData.push(...response['results']);
      nextPageCursor = response['nextPageCursor'];
      if (!nextPageCursor) {
        break;
      }
    }

    console.log('items before filtering: ', fullData.length)

    return fullData;
};
