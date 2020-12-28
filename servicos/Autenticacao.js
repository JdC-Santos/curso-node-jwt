module.exports = (app) => {

	localStrategy 	= app.get('passportLocal').Strategy;
	bearerStrategy 	= app.get('bearer').Strategy;

	app.get('passport').use( new localStrategy({
		usernameField: 'email', 
		passwordField: 'senha', 
		session:false },
		(email, senha, done) => {

			var usuario = new app.daos.usuariosDao( app.persistencia.db );
 
	        usuario.buscarPorEmail(email, function( error, usuario ) {
	            
	            if(error){
					done('Ocorreu um erro ao verificar o usuário.');
	            }else{

					if(!usuario || !usuario.length ){
						done('Não existe usuário com este email');
					}else{

						verificaSenha(senha, usuario[0].senha )
						.then(( senhaEhValida ) => {

							if ( senhaEhValida ) {
								done(null,usuario[0]);
							} else {
								done('Email ou senha inválidos');
							}
						});
					}
				}
			});
		}
	));

	app.get('passport').use( new bearerStrategy(
		(token, done) => {
			app.get('jwt').verify(token, process.env.CHAVE_JWT, (error, payload) =>{

				if(error){
					done(error);
				}else{
					var usuarioDao = new app.daos.usuariosDao( app.persistencia.db );
			
					usuarioDao.buscarPorId({ id: payload.id },function(error, usuario){
						if(error || !usuario.length ){
							done('Usuário nao encontrado');
						}else{
							done(null, usuario[0]);
						}
					});
				}
			});			
		})
	);

	async function verificaSenha(senha, senhaHash){
		return await app.get('bcrypt').compare(senha, senhaHash);
	}
}