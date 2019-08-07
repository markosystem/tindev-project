const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();
require('dotenv').config()

mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority', { useNewUrlParser: true })

server.use(express.json());
server.use(routes);

server.listen(3333);