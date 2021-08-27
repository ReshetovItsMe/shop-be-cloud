import 'source-map-support/register';
import { getProductsList } from './src/handlers/getProductsList';
import { getProductById } from './src/handlers/getProductById';
import { createNewProduct } from './src/handlers/createProduct';
import { catalogBatchProcess } from './src/handlers/catalogBatchProcess';

export { getProductsList, getProductById, createNewProduct, catalogBatchProcess };