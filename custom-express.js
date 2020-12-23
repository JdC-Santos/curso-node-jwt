const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


module.exports = function () {
    var app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    consign()
        .include('controllers')
        .then('persistencia')
        .then('servicos')
        .then('daos')
        .into(app);

    return app;
}