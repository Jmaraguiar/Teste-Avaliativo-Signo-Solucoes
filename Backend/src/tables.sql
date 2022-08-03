-- Active: 1658093017990@@35.226.146.116@3306@silveira-21814397-joao-aguiar
CREATE TABLE Enquetes (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
);

CREATE TABLE Enquete_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enqueteID VARCHAR(255) NOT NULL,
    FOREIGN KEY (enqueteID) REFERENCES Enquetes(id),
    `option` VARCHAR(255) NOT NULL,
    votes INT DEFAULT(0) 
)