# Proyecto de Docker con Node.js, MySQL y Nginx
Este proyecto consiste en una aplicación Node.js que se conecta a una base de datos MySQL, y usa Nginx para balancear la carga entre varias réplicas del contenedor Node. El contenedor Nginx está expuesto a internet y los contenedores de Node y MySQL dentro de una red interna.

## Requisitos
- Docker
- Docker Compose

## Cómo Ejecutar el Proyecto
1. Clonar el repositorio.
2. Crear el fichero con las variables de entorno
    2.1. Crear fichero de nombre .env
    2.2. Establecer las variables de entorno para MySQL, ejemplo de contenido:

        # Variables de entorno para MySQL
        MYSQL_ROOT_PASSWORD='Aa1234Bb5678'
        MYSQL_DATABASE='Comercio'

        # Variables de entorno para Node.js
        MYSQL_HOST='mysql'
        MYSQL_USER='root'
        MYSQL_PASSWORD='Aa1234Bb5678'
        MYSQL_DATABASE='Comercio'
        
3. Ejecutar `docker-compose up --build` para construir y levantar los contenedores.
4. Acceder a `http://localhost:1234` para ver la aplicación en ejecución.

## CI/CD y Análisis de vulnerabilidades
Este proyecto utiliza GitHub Actions para CI/CD (ejecución de pruebas unitarias) y Docker Scout para análisis de vulnerabilidades de imágenes Docker.