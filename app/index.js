require('dotenv').config();  // Carga las variables de entorno desde el archivo .env

const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = 8012;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Establecer la carpeta donde estarán las vistas
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, imágenes...)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Función para obtener productos, con lógica para insertar datos si la tabla está vacía
async function getProductos() {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    if (rows.length === 0) {
      await pool.query('INSERT INTO Productos (nombre, descripcion, precio) VALUES ?', [
        [
          ['Cacerola antiadherente', 'Cacerola de 24 cm con recubrimiento antiadherente, ideal para salsas y guisos.', 29.99],
          ['Juego de cubiertos de acero inoxidable', 'Set de cubiertos de 24 piezas, incluye cuchillos, tenedores, cucharas y cucharitas.', 25.50],
          ['Olla a presión', 'Olla a presión de 5 litros, perfecta para cocinar rápidamente carnes y guisos.', 39.99],
          ['Mantel de lino', 'Mantel de lino de 150x250 cm, ideal para cenas formales y decoraciones elegantes.', 18.75],
          ['Tetera de acero inoxidable', 'Tetera de acero inoxidable con capacidad de 1.5 litros, para preparar té o infusiones.', 22.40],
          ['Batidora de mano', 'Batidora de mano de 600W con 2 velocidades, ideal para batir sopas, batidos y salsas.', 18.90],
          ['Juego de tazas de cerámica', 'Juego de 6 tazas de cerámica, diseño elegante y aptas para microondas.', 19.99],
          ['Sartenes antiadherentes', 'Juego de 2 sartenes antiadherentes de 20 cm y 28 cm, con mango ergonómico y resistente al calor.', 34.95],
          ['Frutero de acero inoxidable', 'Frutero moderno de acero inoxidable, ideal para tener frutas a la vista en la cocina.', 16.50],
          ['Rallador multifuncional', 'Rallador de acero inoxidable con 4 diferentes tipos de corte, perfecto para quesos y vegetales.', 12.99],
          ['Jarra medidora', 'Jarra medidora de 1 litro, con marcas claras en mililitros y tazas, de plástico resistente.', 6.75],
          ['Colador de acero', 'Colador de acero inoxidable con mango ergonómico, perfecto para escurrir pasta o verduras.', 9.50]
        ]
      ]);
      return getProductos(); // Llamada recursiva para obtener los datos insertados
    } else {
      return rows;
    }
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

// Ruta principal para obtener productos
app.get('/', async (req, res) => {
  try {
    const productos = await getProductos();

    res.render('theme', { 
      title: 'Proyecto final curso de Docker',
      productos: productos
    });
  } catch (error) {
    res.status(500).send(`Error al obtener productos: ${error.message}`);
  }
});

//Ruta para pruebas unitarias
app.get('/test', (req, res) => {
    try {
        res.send('Hola Mundo!');
    } catch (error) {
        console.error('Error en solicitud GET /test:', error);
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor corriendo en puerto ${port}`);
    });
}

// Exporta la aplicación para poder utilizarla en las pruebas
module.exports = app;