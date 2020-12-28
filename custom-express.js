const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportLocal = require('passport-local');
const jwt = require('jsonwebtoken');
const bearer = require('passport-http-bearer');

require('dotenv').config();

module.exports = function () {
    var app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.set('bcrypt',bcrypt);
    
    app.set('passport', passport);
    app.set('passportLocal',passportLocal);
    app.set('bearer',bearer);

    app.set('jwt',jwt);

    consign()
        .include('controllers')
        .then('persistencia')
        .then('servicos')
        .then('daos')
        .into(app);

    return app;
}