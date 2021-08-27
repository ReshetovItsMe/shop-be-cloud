import "source-map-support/register";
import { SQSEvent } from "aws-lambda";
import { response } from "./utils";
import { createProducts } from "../services/products";

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    console.log(`LOG event`, event);
    const products = event.Records.map((r) => JSON.parse(r.body));
    const newProducts = await createProducts(products);
    return response(200, JSON.stringify(newProducts));
  } catch (error) {
    response(400, JSON.stringify(error.message));
  }
};
