import { createClient } from './dbClient';
import { QueryResultRow } from 'pg';

export interface IProduct {
    count: number,
    description?: string,
    id: string,
    price: number,
    title: string
};

const isProduct = ({ id, title, price, count }: IProduct) => (id && title && price && count);

const getAllProducts = async (): Promise<IProduct[]> => {
    const dbClient = createClient();
    await dbClient.connect();
    try {
        const ddlResult = await dbClient.query(`
        select p.id as id, p.title as title, p.price as price, p.description as description, s.count as count
        from shop.products p left join shop.stocks s on p.id = s.product_id
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
        await dbClient.end();
    }
};

const getProductById = async (id: string): Promise<IProduct> => {
    const dbClient = createClient();
    await dbClient.connect();
    try {
        const ddlResult = await dbClient.query(`
        select p.id as id, p.title as title, p.price as price, p.description as description, s.count as count
        from shop.products p left join shop.stocks s on p.id = s.product_id where p.id = $1
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
        await dbClient.end();
    }
};

const createNewProduct = async (product: IProduct): Promise<IProduct> => {
    const dbClient = createClient();
    await dbClient.connect();
    try {
        await dbClient.query('BEGIN')
        const ddlResult = await dbClient.query(`
        insert into shop.products(id, title, price, description) values($1, $2, $3, $4) returning *
        `, [product.id, product.title, product.price, product.description]);
        const ddl2Result = await dbClient.query(`
        insert into shop.stocks(product_id, count) VALUES ($1, $2) returning count
        `, [ddlResult.rows[0].id, product.count]);
        await dbClient.query('COMMIT')
        const newProduct: IProduct = {
            count: ddl2Result.rows[0]['count'],
            description: ddlResult.rows[0]['description'],
            id: ddlResult.rows[0]['id'],
            price: ddlResult.rows[0]['price'],
            title: ddlResult.rows[0]['title']
        };
        return newProduct;
    } catch (e) {
        await dbClient.query('ROLLBACK')
        console.error(e);
        throw e;
    } finally {
        await dbClient.end();
    }
};

const insertArrayProducts = async (products: IProduct[]): Promise<IProduct[]> => {
    const dbClient = createClient();
    await dbClient.connect();
    try {
        const productValues = products.map((p) => `('${p.id}', '${p.title}', '${p.price}', '${p.description}')`).join(", ");
        const stocksValues = products.map((p) => `('${p.id}', '${p.count}')`).join(", ");
        await dbClient.query('BEGIN')
        await dbClient.query(`
        insert into shop.products(id, title, price, description) values ${productValues}`);
        await dbClient.query(`
        insert into shop.stocks(product_id, count) values ${stocksValues}`);
        await dbClient.query('COMMIT')
        const selectProducts = await dbClient.query(
            `select p.id as id, p.title as title, p.price as price, p.description as description, s.count as count
            from shop.products p left join shop.stocks s on p.id = s.product_id
            where p.id in (${products.map(({ id }) => `'${id}'`).join(", ")});`)
        const { rows } = selectProducts;
        return rows;
    } catch (e) {
        await dbClient.query('ROLLBACK')
        console.error(e);
        throw e;
    } finally {
        await dbClient.end();
    }
};

export { getAllProducts, getProductById, createNewProduct, isProduct, insertArrayProducts };
