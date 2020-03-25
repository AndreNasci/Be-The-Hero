//importa o módulo express para a variável express
const express = require('express');

//cors: determina quem pode acessar a aplicação
const cors = require('cors');

//importar rotas de outro arquivo
const routes = require('./routes');
//como routes é um arquivo usa-se ./


//uma variável que contem a aplicação
const app = express(); 
//nela estarão todas as funcionalidades 

app.use(cors());

// diz a aplicação que as informações de requisições 
// são dadas no formato json
app.use(express.json());
app.use(routes);
//importante que essa linha venha abaixo da anterior



//essa aplicação "ouve" a porta 3333 
app.listen(3333);