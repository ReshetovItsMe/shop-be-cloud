import { getAllProducts, getProductById, IProduct } from '../database/products';

const getProducts = async (): Promise<IProduct[]> => getAllProducts();

const getOneProductById = async (id: string): Promise<IProduct> => getProductById(id);

export { getProducts, getOneProductById };