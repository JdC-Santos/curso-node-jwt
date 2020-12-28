const passport = require('passport');

authentication = {
    local: function(req, res, next){
        passport.authenticate('local',{ session:false },(error, usuario, info) => {

            if(error){
                return res.status(400).send({ error });
            }

            if(!usuario){
                return res.status(400).send({});
            }

            req.user =  usuario;
            return next();
        })(req, res, next);
    },
    bearer: function(req, res, next){
        passport.authenticate('bearer',{ session:false },(error, usuario, info) => {

            if(error && error.name === 'JsonWebTokenError'){
                return res.status(401).send({ error: error.message });
            }

            if(error ){
                return res.status(500).send({ error: error.message });
            }

            if(!usuario){
                return res.status(401).send({});
            }

            req.user =  usuario;
            return next();
        })(req, res, next);
    }
}

module.exports = authentication;