const express = require('express');
const routes = require('./routes');
const path = require('path');

const server = express();

// Utilização do EJS para embutirmos javascript no nosso códgio html e usar template engine:
server.set('view engine', 'ejs');

// Caminho do 'views' para o EJS encontrar
// Alterando a localização da pasta 'views':
server.set('views', path.join(__dirname, 'views'));

// Habilitação dos arquivos estáticos / públicos através de um middleware para que possam
// ser servidos no frontend html:
server.use(express.static("public"));

// habilitando requisições do 'body':
server.use(express.urlencoded({ extended: true }));

// Routes
server.use(routes);

server.listen(3000, () => console.log('Servidor Iniciado 🚀'));
