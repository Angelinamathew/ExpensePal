DROP TABLE IF EXISTS WalletEntity
CREATE TABLE WalletEntity(

    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    accountNumber VARCHAR(30),
    description VARCHAR(100),
    priority INT,
    currentBalance DOUBLE
);
