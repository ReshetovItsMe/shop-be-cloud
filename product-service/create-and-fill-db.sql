CREATE SCHEMA shop;

CREATE TABLE shop.PRODUCTS(
    ID UUID NOT NULL,
    TITLE TEXT NOT NULL,
    PRICE  INTEGER NOT NULL,
    DESCRIPTION TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE shop.STOCKS(
    PRODUCT_ID UUID NOT NULL,
    COUNT INTEGER NOT NULL,
    CONSTRAINT FK_PRODUCTS
    FOREIGN KEY(PRODUCT_ID)
    REFERENCES shop.PRODUCTS(ID)
);

CREATE TABLE shop.products_json (
	id serial NOT NULL PRIMARY KEY,
	product json NOT NULL
);

INSERT INTO shop.products_json (product) VALUES
('{"count": 4,"description": "Short Product Description1","id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa","price": 24,"title": "ProductOne"}'),
('{"count": 6,"description": "Short Product Description3","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0","price": 10,"title": "ProductNew"}'),
('{"count": 7,"description": "Short Product Description2","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2","price": 23,"title": "ProductTop"}'),
('{"count": 12,"description": "Short Product Description7","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1","price": 15,"title": "ProductTitle"}'),
('{"count": 7,"description": "Short Product Description2","id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3","price": 23,"title": "Product"}'),
('{"count": 8,"description": "Short Product Description4","id": "7567ec4b-b10c-48c5-9345-fc73348a80a1","price": 15,"title": "ProductTest"}'),
('{"count": 2,"description": "Short Product Description1","id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2","price": 23,"title": "Product2"}'),
('{"count": 3,"description": "Short Product Description7","id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1","price": 15,"title": "ProductName"}');

INSERT INTO shop.products (id, title, price, description)
select uuid(product::json->>'id') as id, product::json->>'title' as title, cast(product::json->>'price' as INTEGER) as price, product::json->>'description' as description
from shop.products_json;
INSERT INTO shop.stocks (product_id, count)
select uuid(product::json->>'id') as id, cast(product::json->>'count' as INTEGER) as count
from shop.products_json;

DROP TABLE shop.products_json;  