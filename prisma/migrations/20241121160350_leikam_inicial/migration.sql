-- CreateTable
CREATE TABLE `Addresses` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `street` VARCHAR(255) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `floor` VARCHAR(10) NULL,
    `apartment` VARCHAR(10) NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attributes` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `color` VARCHAR(50) NULL,
    `model` VARCHAR(255) NULL,
    `brand` VARCHAR(255) NULL,
    `dimensions` VARCHAR(255) NULL,
    `weight` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `address_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    INDEX `address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kits` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_Images` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `product_id` CHAR(36) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,

    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `current_stock` INTEGER NOT NULL,
    `category` VARCHAR(255) NULL,
    `warranty_period` INTEGER NULL,
    `attribute_id` CHAR(36) NULL,

    INDEX `attribute_id`(`attribute_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products_Kits` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `kit_id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `kit_id`(`kit_id`),
    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote_Details` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `quote_id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,

    INDEX `product_id`(`product_id`),
    INDEX `quote_id`(`quote_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotes` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `client_id` CHAR(36) NOT NULL,
    `creation_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total_amount` DECIMAL(10, 2) NOT NULL,

    INDEX `client_id`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technicians` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `address_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,
    `skills` TEXT NULL,
    `dni` VARCHAR(20) NOT NULL,
    `criminal_records` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `user_id`(`user_id`),
    INDEX `address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technicians_Work_Orders` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `work_order_id` CHAR(36) NOT NULL,
    `technician_id` CHAR(36) NOT NULL,
    `client_note` TINYINT NULL,

    INDEX `technician_id`(`technician_id`),
    INDEX `work_order_id`(`work_order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('Admin', 'Technician', 'Client', 'God') NOT NULL,
    `active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work_Orders` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `client_id` CHAR(36) NOT NULL,
    `creation_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('Pending', 'In Progress', 'Completed', 'Canceled') NOT NULL,
    `comments` TEXT NULL,
    `work_note` TINYINT NULL,

    INDEX `client_id`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
