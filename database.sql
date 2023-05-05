create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    token TEXT
);

create TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES person (id)
);

create TABLE cart(
    products INT,
    user_id INT,
    FOREIGN KEY (products) REFERENCES product (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES person (id)
);



