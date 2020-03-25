// Responsável pelo perfil de uma ONG

//importa conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
  //método que retorna todos os incidents de uma única ong
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      //buscar todos os incidents que essa ong criou
      .where('ong_id', ong_id) 
      //todos os campos dos incidents
      .select('*'); 

    return response.json(incidents);
  }
};