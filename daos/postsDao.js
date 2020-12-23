function postsDao(conn){
    this._conn = conn;
}

postsDao.prototype = {
    salvar: function (post,callback){
        this._conn.query('INSERT INTO posts SET ?',post,callback);
    },
    atualizar: function (post,callback){
        this._conn.query('UPDATE posts SET ? WHERE id = ?',[post, post.id],callback);
    },
    listar: function(callback){
        this._conn.query('SELECT * FROM posts ', callback);
    },
    buscarPorId: function(post,callback){
        this._conn.query('SELECT * FROM posts WHERE id = ?',post.id, callback);
    },
    remover: function(post,callback){
        this._conn.query('DELETE FROM posts WHERE id = ?',post.id, callback);
    }
}

module.exports = () =>{
    return postsDao;
}