import {
  getAllProducts,
  getProductById,
  createNewProduct,
  IProduct,
  isProduct,
} from "../database/products";

const getProducts = async (): Promise<IProduct[]> => getAllProducts();

const getOneProductById = async (id: string): Promise<IProduct> =>
  getProductById(id);

const createProduct = async (product: IProduct): Promise<IProduct> =>
  createNewProduct(product);

const createProducts = async (products: IProduct[]): Promise<IProduct[]> => {
  const newProducts: IProduct[] = [];
  products.forEach(async (product) => {
    const newProduct = await createNewProduct(product);
    if (!isProduct(newProduct)) {
      throw new Error(`Product ${JSON.stringify(product)} cant be created`);
    }
    newProducts.push(newProduct);
    console.log("LOG inserted products db response", newProduct);
  });
  return newProducts;
};

export { getProducts, getOneProductById, createProduct, createProducts };
