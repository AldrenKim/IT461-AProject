CREATE DATABASE farm;

USE farm;

CREATE TABLE animals(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200) NOT NULL,
    date_updated DATE NOT NULL,
    filename VARCHAR(200),
    count INT NOT NULL,
    PRIMARY KEY (id),
    INDEX (name)
);

CREATE TABLE plants(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    scientific_name VARCHAR(200) NOT NULL,
    date_updated DATE NOT NULL,
    filename VARCHAR(200),
    area FLOAT(24) NOT NULL,
    PRIMARY KEY (id),
    INDEX (name)
);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    type  VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    INDEX (username)
);

INSERT INTO users (username, password) VALUES ('admin', 'admin');
