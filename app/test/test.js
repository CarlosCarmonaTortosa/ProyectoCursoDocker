const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index');  // Importa el archivo de servidor

describe('GET /test', () => {
    it('Debe devolver Hola Mundo! con status 200', async () => {
        try {
            const response = await request(app).get('/test');
            expect(response.status).to.equal(200);
            expect(response.text).to.equal('Hola Mundo!');
        } catch (error) {
            // Si ocurre un error, lo mostramos en la consola
            console.error('Error en la prueba:', error);
            throw error; // Vuelve a lanzar el error para detener la ejecución
        }
    });
});