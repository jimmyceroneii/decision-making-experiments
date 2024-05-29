import { fetchDocumentListApi } from "../sources/readwise-reader/fetch";

const main = async () => {
    await fetchDocumentListApi();
}

main();