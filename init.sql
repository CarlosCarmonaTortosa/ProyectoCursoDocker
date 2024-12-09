CREATE DATABASE IF NOT EXISTS Comercio;
USE Comercio;

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10,2)
);