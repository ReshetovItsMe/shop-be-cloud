import "source-map-support/register";
import { SQSEvent } from "aws-lambda";
import { response } from "./utils";
import { createProducts } from "../services/products";
import { snsService } from "../services/sns";

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    console.log(`event from sqs`, event);

    const products = event.Records.map((r) => JSON.parse(r.body));
    console.log(`products from event`, products);
    const newProducts = await createProducts(products);
    console.log(`created products`, newProducts);

    const message = newProducts.map((p) => JSON.stringify(p)).join("\n");
    await snsService.publish(message);

    return response(200, JSON.stringify(newProducts));
  } catch (error) {
    response(400, JSON.stringify(error.message));
  }
};
