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
					console.log(error);
					done( error );
	            }else{
					if(!usuario || !usuario.length ){
						// console.log('Não existe usuário com este email');
						done({erro: 'Não existe usuário com este email'});
					}else{
						if(!verificaSenha(senha, usuario[0].senha ) ){
							done('Não existe usuário com este email');
						}else{
							done(null,usuario[0]);
						}
					}	                
				}
			});
		}
	));

	app.get('passport').use( new bearerStrategy(
		(token, done) => {
			const payload = app.get('jwt').verify(token, process.env.CHAVE_JWT);

			var usuarioDao = new app.daos.usuariosDao( app.persistencia.db );

			usuarioDao.buscarPorId({ id: payload.id },function(error, usuario){
				if(error || !usuario.length ){
					done('Usuário nao encontrado');
				}else{
					done(null, usuario[0]);
				}
			});
		})
	);

	// app.get('passport').serializeUser(function(user, done) {
	//     console.log(user);
	//     done(null, user);
	// });
	  
	// app.get('passport').deserializeUser(function(user, done) {
	//     done(null, user);
	// });

	function verificaSenha(senha, senhaHash){
		return app.get('bcrypt').compare(senha, senhaHash);
	}

}