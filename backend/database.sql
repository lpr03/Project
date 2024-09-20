CREATE DATABASE IF NOT EXISTS formDB;

USE formDB;

CREATE TABLE IF NOT EXISTS formEntries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    formType VARCHAR(10),
    name VARCHAR(100),
    countryCode VARCHAR(5),
    phoneNumber VARCHAR(15)
);
