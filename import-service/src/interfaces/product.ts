export interface IProduct {
    count: number,
    description?: string,
    id: string,
    price: number,
    title: string
};

export const isProduct = ({ id, title, price, count }: IProduct) => (id && title && price && count);