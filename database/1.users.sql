CREATE TABLE users
(
    users_id BINARY(16) PRIMARY KEY,
    users_code VARCHAR(20),
    users_name VARCHAR(60),
    password CHARACTER VARYING(100),
    type INT,
    mobile_phone_no VARCHAR(20),
    email VARCHAR(100)
);

DROP TABLE users;
