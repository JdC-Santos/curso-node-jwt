const middlewareAuthentication = require('../middlewares/authentication');

module.exports = function(app){

    app.get('/posts',(req, res) => {
        var postsDao = new app.daos.postsDao( app.persistencia.db );

        postsDao.listar( (error,resultado) => {
            if( error ){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(200).json(resultado);
            }
        });
    });

    app.get('/posts/post/:id',(req, res) => {
        var postsDao = new app.daos.postsDao( app.persistencia.db );

        var id = req.params.id;

        postsDao.buscarPorId({ id }, (error,resultado) => {
            if( error ){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(200).json(resultado[0]);
            }
        });
    });

    app.post('/posts/post',
    middlewareAuthentication.bearer, 
    (req, res) => {
        const { titulo, conteudo } = req.body;

        var msgError = {};

        if(titulo == '') msgError.titulo = "este campo é obrigatório";
        if(conteudo == '') msgError.conteudo = "este campo é obrigatório";        

        if(Object.keys(msgError).length > 0){
            res.status(400).json(msgError);
            return;
        }else{
            var postsDao = new app.daos.postsDao( app.persistencia.db );
            postsDao.salvar({titulo,conteudo },(error, result) => {

                if(error){
                    console.log(error);
                    res.status(500).json(error);
                }else{
                    res.status(201).json(result);
                }

            });

        }
    });

    app.put('/posts/post/:id', (req, res) => {
        const { titulo,conteudo} = req.body;
        const id = req.params.id;

        var postsDao = new app.daos.postsDao( app.persistencia.db );
        postsDao.atualizar({titulo,conteudo, id},(error, result) => {

            if(error){
                console.log(error);
                res.status(500).json(error);
            }else{
                res.status(201).json(result);
            }

        });
    });

    app.delete('/posts/post/:id',
        middlewareAuthentication.bearer,
        (req, res) => {
            const id = req.params.id;

            var postsDao = new app.daos.postsDao( app.persistencia.db );
            postsDao.remover({id},(error, result) => {

                if(error){
                    console.log(error);
                    res.status(500).json(error);
                }else{
                    res.status(204).json(result);
                }

            });
    });
}