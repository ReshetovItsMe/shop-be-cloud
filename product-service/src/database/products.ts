import productList from './productList.json';

export interface IProduct {
    count: number,
    description: string,
    id: string,
    price: number,
    title: string
};

const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const productsJson = productList;
        return productsJson;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export { getAllProducts };