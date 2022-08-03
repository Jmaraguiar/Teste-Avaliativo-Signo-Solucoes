-- Active: 1658093017990@@35.226.146.116@3306@silveira-21814397-joao-aguiar
CREATE TABLE Enquetes (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    options VARCHAR(10000) NOT NULL,
    totalVotes INT DEFAULT(0)
);
