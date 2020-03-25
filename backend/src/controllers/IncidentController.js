//importa conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
  //méteodo que lista os casos (incidents)
  async index(request, response) {
    //busca o parâmetro page, se nao existir default=1
    const { page = 1 } = request.query;

    //função retorna um array, o colchete serve para pegar
    //apenas a primeira posição
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      //join relaciona dados de duas tabelas
      //dados de ongs, apenas os que o id coincidem
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5) //limite de 5 por pagina
      .offset((page - 1) * 5) //pula 5 a cada página
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);
    
    return response.json(incidents);
  },

  //método que cria casos 
  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  //método que deleta casos
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    //verifica se o caso foi criado pela ong que está tentando deletar
    if(incident.ong_id != ong_id) {
      //retorna um http status code (401: unauthorized)
      return response.status(401).json({ error: 'Operation not permited.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
};