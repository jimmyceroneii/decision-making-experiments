import { shuffleList } from "../../utils/randomizer";
import { isValidProduct } from "./filter";
import { fetchLocalArticles } from "./readwise";
import type { ReadwiseArticle } from "./types";

export const retrieveRandomReadwiseProduct =
    (): ReadwiseArticle => {
        const articles = fetchLocalArticles();

        if (!articles) {
            throw new Error("no articles found in json backup");
        }

        console.log("filtering to only valid articles");

        const products = articles.filter((data) =>
            isValidProduct(data),
        );

        console.log(
            "number of products after filtering: ",
            products.length,
        );

        const shuffledReadwiseProducts = shuffleList(products);

        const randomReadwiseProduct = shuffledReadwiseProducts[0];

        return randomReadwiseProduct;
    };
