const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {

  //realiza funcções antes de cada teste
  beforeEach(async () => {
  
    //zera o banco de dados
    await connection.migrate.rollback();
    
    //executa as migrations
    await connection.migrate.latest();
  });

  //realiza funções depois de todos os testes
  afterAll(async () => {

    //desfaz a conexão do teste com o banco de dados
    await connection.destroy();
  });

  it ('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@test.com",
        whatsapp: "4700000000",
        city: "Rio de Janeiro",
        uf: "RJ"
      });
    
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});