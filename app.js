const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes');

express.urlencoded({ extended: true });
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(routes);

const server = http.createServer(app);

server.listen(3000);