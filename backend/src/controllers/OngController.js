const generateUniqueId = require('../utils/generateUniqueId');
const crypto = require('crypto');

//importa conexão com o banco de dados
const connection = require('../database/connection');

//exportar um objeto com os métodos
module.exports = {

  //método que lista as ongs
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    
    return response.json(ongs);
  },

  //método que  cria uma ong
  async create(request, response) {
    //descontrução da variável (no lugar de apenas data)
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    //ao chegar neste código ele irá esperar a finalização
    //para entao realizar o return
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    //retornar uma resposta pro cliente (navegador) que está acessando
    return response.json( {id} );
  }
}