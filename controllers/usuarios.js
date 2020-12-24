module.exports = function(app){

    app.get('/usuarios',(req, res) => {
        var usuariosDao = new app.daos.usuariosDao( app.persistencia.db );

        usuariosDao.listar( (error,resultado) => {
            if( error ){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(200).json(resultado);
            }
        });
    });

    app.get('/usuarios/usuario/:id',(req, res) => {
        var usuariosDao = new app.daos.usuariosDao( app.persistencia.db );

        var id = req.params.id;

        usuariosDao.buscarPorId({id},(error,resultado) => {
            if( error ){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(200).json(resultado[0]);
            }
        });
    });

    app.post('/usuarios/usuario', (req, res) => {
        const { nome, email, senha } = req.body;

        var msgError = {};

        if(nome == '') msgError.nome = "este campo é obrigatório";
        if(email == '') msgError.email = "este campo é obrigatório";
        if(senha == '') msgError.senha = "este campo é obrigatório";

        if(Object.keys(msgError).length > 0){
            res.status(400).json(msgError);
            return;
        }else{

            app.get('bcrypt').genSalt(10, function(err, salt) {
                app.get('bcrypt').hash(senha, salt, function(err, hash) {

                    var usuariosDao = new app.daos.usuariosDao( app.persistencia.db );
                    
                    usuariosDao.salvar({nome, email,senha: hash},(error, result) => {

                        if(error){
                            console.log(error);
                            res.status(500).json(error);
                        }else{
                            res.status(201).json(result);
                        }

                    });     
                });
            });
        }
    });

    app.put('/usuarios/usuario/:id', (req, res) => {
        const { nome, email, senha } = req.body;
        const id = req.params.id;

        var usuariosDao = new app.daos.usuariosDao( app.persistencia.db );
        usuariosDao.atualizar({nome, email, senha, id},(error, result) => {

            if(error){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(201).json(result);
            }

        });
    });

    app.delete('/usuarios/usuario/:id', (req, res) => {
        const id = req.params.id;

        console.log(id);

        var usuariosDao = new app.daos.usuariosDao( app.persistencia.db );
        usuariosDao.remover({id},(error, result) => {

            if(error){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(204).json(result);
            }

        });
    });
}