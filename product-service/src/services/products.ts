import {
  getAllProducts,
  getProductById,
  createNewProduct,
  IProduct,
  insertArrayProducts,
} from "../database/products";

const getProducts = async (): Promise<IProduct[]> => getAllProducts();

const getOneProductById = async (id: string): Promise<IProduct> =>
  getProductById(id);

const createProduct = async (product: IProduct): Promise<IProduct> =>
  createNewProduct(product);

const createProducts = async (products: IProduct[]): Promise<IProduct[]> => {
  console.log(`to create products`, products);
  const newProducts: IProduct[] = await insertArrayProducts(products);
  return newProducts;
};

export { getProducts, getOneProductById, createProduct, createProducts };
