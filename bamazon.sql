create database bamazon;
use bamazon;

create table products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) not NULL,
  department_name VARCHAR(45) not NULL,
  price INTEGER(11) not NULL,
  stock_quantity INTEGER(11) NOT NULL,
  primary key (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("size 12 hiking shoes", "outdoors", 85, 4),
("camelbak, 3L", "outdoors", 120, 12),
("gripping pageturner", "books", 9, 63),
("The Total Bike Maintainence Book", "books", 24.95, 31),
("a gross of kazoos for a kid's party", "misc", 14, 12),
("a fresh hoodie without little coffee stains", "apparel", 28, 19),
("6-ton jack", "automotive", 140, 8),
("new toothbrush", "hygiene", 4, 130),
("Motorhead S/T LP", "music", 16, 14),
("a generic movie poster for your dorm room", "decor", 19, 30)
;