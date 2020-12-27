function usuariosDao(conn){
    this._conn = conn;
}

usuariosDao.prototype = {
    salvar: function (usuario,callback){
        this._conn.query('INSERT INTO usuarios SET ?',usuario,callback);
    },
    atualizar: function (usuario,callback){
        this._conn.query('UPDATE usuarios SET ? WHERE id = ?',[usuario, usuario.id],callback);
    },
    listar: function(callback){
        this._conn.query('SELECT * FROM usuarios ', callback);
    },
    buscarPorId: function(usuario,callback){
        this._conn.query('SELECT * FROM usuarios WHERE id = ?',usuario.id, callback);
    },
    buscarPorEmail: function(email,callback){
        this._conn.query('SELECT * FROM usuarios WHERE email = ?',email, callback);
    },
    remover: function(usuario,callback){
        this._conn.query('DELETE FROM usuarios WHERE id = ?',usuario.id, callback);
    }
}

module.exports = () => {
    return usuariosDao;
}