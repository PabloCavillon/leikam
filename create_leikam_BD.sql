-- Create the database
CREATE DATABASE Leikam;
USE Leikam;

-- Table: Addresses
CREATE TABLE Addresses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    street VARCHAR(255) NOT NULL,
    number VARCHAR(10) NOT NULL,
    floor VARCHAR(10),
    apartment VARCHAR(10),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL
);

-- Table: Users
CREATE TABLE Users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Technician', 'Client') NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Table: Clients
CREATE TABLE Clients (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    address_id CHAR(36) NOT NULL,
    user_id CHAR(36) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    FOREIGN KEY (address_id) REFERENCES Addresses(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table: Technicians
CREATE TABLE Technicians (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    address_id CHAR(36) NOT NULL,
    user_id CHAR(36) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    skills TEXT,
    dni VARCHAR(20) NOT NULL, -- DNI of the technician
    criminal_records BOOLEAN DEFAULT FALSE, -- True if the technician has criminal records
    FOREIGN KEY (address_id) REFERENCES Addresses(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Table: Atributos
CREATE TABLE Attributes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    color VARCHAR(50),
    model VARCHAR(255),
    brand VARCHAR(255),
    dimensions VARCHAR(255) COMMENT 'Dimensions (LxWxH)'
);

-- Table: Products
CREATE TABLE Products (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    current_stock INT NOT NULL,
    category VARCHAR(255),
    warranty_period INT COMMENT 'Warranty in months',
    weight DECIMAL(10,2) COMMENT 'Weight in kilograms',
    attribute_id CHAR(36),
    FOREIGN KEY (attribute_id) REFERENCES Attributes(id)
);

-- Table: Kits
CREATE TABLE Kits (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table: Products_Kits
CREATE TABLE Products_Kits (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    kit_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (kit_id) REFERENCES Kits(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Table: Quotes
CREATE TABLE Quotes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    client_id CHAR(36) NOT NULL,
    creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

-- Table: Quote_Details
CREATE TABLE Quote_Details (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    quote_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (quote_id) REFERENCES Quotes(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Table: Work_Orders
CREATE TABLE Work_Orders (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    client_id CHAR(36) NOT NULL,
    creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'In Progress', 'Completed', 'Canceled') NOT NULL,
    comments TEXT,
    work_note TINYINT CHECK (work_note BETWEEN 1 AND 5), -- Note to classify the job (1 to 5)
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

-- Table: Technicians_Work_Orders
CREATE TABLE Technicians_Work_Orders (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    work_order_id CHAR(36) NOT NULL,
    technician_id CHAR(36) NOT NULL,
    client_note TINYINT CHECK (client_note BETWEEN 1 AND 5), -- Note for the technician (1 to 5)
    FOREIGN KEY (work_order_id) REFERENCES Work_Orders(id),
    FOREIGN KEY (technician_id) REFERENCES Technicians(id)
);

-- Table: Product_Images
CREATE TABLE Product_Images (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id CHAR(36) NOT NULL,
    image_url VARCHAR(255) NOT NULL, -- Aquí almacenamos la URL o la ruta de la imagen
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
