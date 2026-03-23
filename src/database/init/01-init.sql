-- =========================================
-- INIT DATABASE SCHEMA
-- =========================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS stocks;

DROP TABLE IF EXISTS variants;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS warehouses;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================
-- TABLE: warehouses
-- =========================================

CREATE TABLE warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLE: products
-- =========================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_sku VARCHAR(100),
    base_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLE: variants
-- =========================================

CREATE TABLE variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255),
    color VARCHAR(50),
    size VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id)
);

-- =========================================
-- TABLE: stocks
-- =========================================

CREATE TABLE stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    variant_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (variant_id, warehouse_id),
    FOREIGN KEY (variant_id) REFERENCES variants (id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses (id)
);

-- =========================================
-- TABLE: publications
-- =========================================

CREATE TABLE publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_id VARCHAR(255) UNIQUE NOT NULL,
    channel VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- =========================================
-- TABLE: publication_variants
-- =========================================

CREATE TABLE publication_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publication_id INT NOT NULL,
    sku VARCHAR(100) NOT NULL,
    external_variant_id VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (publication_id) REFERENCES publications (id)
);