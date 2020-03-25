const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


//desacoplando o método de rotas do express em uma nova variável
const routes = express.Router();


// === Rotas ProfileController ===
routes.get('/profile', ProfileController.index);



// == Rotas SessionController ===
routes.post('/sessions', SessionController.create);



// === Rotas OngController ===
//listar todas as tabelas
routes.get('/ongs', OngController.index);

//criar primeira rota
//recebe uma função como segundo parâmetro
routes.post('/ongs', OngController.create);



// === Rotas Incident Controller ===
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
//recebe um route param com o id que se deseja deletar
routes.delete('/incidents/:id', IncidentController.delete);



//exportar variável de dentro de um arquivo
module.exports = routes;