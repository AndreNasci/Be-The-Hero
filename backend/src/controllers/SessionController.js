// Esse tipo de controller geralmente é usado para login's

//importa conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
  //método que retorna nome de uma ONG dado um id
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

    if(!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID'});
    }

    return response.json(ong);
  }
};