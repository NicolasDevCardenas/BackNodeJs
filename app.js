'use strict'

var express= require('express');
var bodyParser = require('body-parser');

var app = express();

//rutas
var project_routes = require('./routes/project');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
// Configurar cabeceras y cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, OPTIONS");
    next();
});


//rutas
app.use('/api', project_routes);


//exportar
module.exports = app;

