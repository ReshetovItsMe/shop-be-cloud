import { getAllProducts, IProduct } from '../database/products';

const getProducts = async (): Promise<IProduct[]> => getAllProducts();

const getOneProductById = async (id: string): Promise<IProduct> => {
    try {
        const product: IProduct | undefined = (await getAllProducts()).find(product => product.id === id);
        if (product) {
            return product;
        } else {
            throw new Error('Product not found');
        }
    } catch (e) {
        throw e;
    }
}

export { getProducts, getOneProductById };