import dbClient from './dbClient';
import { QueryResultRow } from 'pg';

export interface IProduct {
    count: number,
    description: string,
    id: string,
    price: number,
    title: string
};

const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        await dbClient.connect();
        const ddlResult = await dbClient.query(`
        select p.id as id, p.title as title, p.price as price, p.description as description, s.count as count
        from shop.products p inner join shop.stocks s on p.id = s.product_id
        `);
        const products: IProduct[] = ddlResult.rows.map((productRow: QueryResultRow) => ({
            count: productRow['count'],
            description: productRow['description'],
            id: productRow['id'],
            price: productRow['price'],
            title: productRow['title']
        }));
        return products;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        dbClient.end();
    }
};

const getProductById = async (id: string): Promise<IProduct> => {
    try {
        await dbClient.connect();
        const ddlResult = await dbClient.query(`
        select p.id as id, p.title as title, p.price as price, p.description as description, s.count as count
        from shop.products p inner join shop.stocks s on p.id = s.product_id where p.id = $1
        `, [id]);
        const product: IProduct = {
            count: ddlResult.rows[0]['count'],
            description: ddlResult.rows[0]['description'],
            id: ddlResult.rows[0]['id'],
            price: ddlResult.rows[0]['price'],
            title: ddlResult.rows[0]['title']
        };
        return product;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        dbClient.end();
    }
};

export { getAllProducts, getProductById };