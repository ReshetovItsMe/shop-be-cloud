import { getAllProducts, getProductById, createNewProduct, IProduct } from '../database/products';

const getProducts = async (): Promise<IProduct[]> => getAllProducts();

const getOneProductById = async (id: string): Promise<IProduct> => getProductById(id);

const createProduct = async (product: IProduct): Promise<IProduct> => createNewProduct(product);

export { getProducts, getOneProductById, createProduct };