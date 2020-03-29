const express = require('express');
const { celebrate,  Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


//desacoplando o método de rotas do express em uma nova variável
const routes = express.Router();


// === Rotas ProfileController ===
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);



// == Rotas SessionController ===
routes.post('/sessions', SessionController.create);



// === Rotas OngController ===
//listar todas as tabelas
routes.get('/ongs', OngController.index);

//recebe uma função a partir do segundo parâmetro
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    // validação dos dados utilizando Celebrate
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);


// === Rotas Incident Controller ===
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    // validação dos dados utilizando Celebrate
    page: Joi.number(),
  })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create);
//recebe um route param com o id que se deseja deletar
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    // validação dos dados utilizando Celebrate
    id: Joi.number().required(),
  })
}), IncidentController.delete);



//exportar variável de dentro de um arquivo
module.exports = routes;