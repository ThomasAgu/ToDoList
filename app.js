const express = require('express')
const app = express()
const port = 3002 || process.env.POR
const bodyParser = require('body-parser')
/* cors :D */
const cors = require('cors')
/* body parser */

/*mysql*/
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'todolist_mysql'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});


/* use cors para no tener problemas a hacer la llamada*/
app.use(cors({
  origin: '*'
}))
/* bodyu parser */
app.use(bodyParser.json());

/* Sql  */



/* routes */
/* devuelve todos los usuario de la plataforma no deberia xd */
app.get('/', (req, res) => {
  const usersNames = `SELECT name FROM user`
  connection.query(usersNames, (err, results) =>{
    if (err) throw err;
    res.json(results)
  })
})

/* Devuelve los todos y categorias de un usuario si es el correcto sino, devuelve msj */
app.post('/', (req, res) =>{
  const pass = req.body.pass
  const user = req.body.user
  /* queries */
  const users = `SELECT * FROM user WHERE name = "${user}" AND pass = MD5("${(pass)}")`
  const usercontent = `SELECT * FROM category, todos`

  connection.query(users, (err, results) =>{
    if (err) throw err;
    if (results.length > 0) {
      connection.query(usercontent, (err, results) =>{
        if(err) throw err;
        res.json(results)
      })
    }
    else{
      res.json({"msg":"contraseña invalida"})
    }
  })
})

/* CRUD todos */

/* Agregar un todo a un usuario */
app.post('/todo', (req,res) =>{
  todoObj = {
    name: req.body.name,
    user_id: req.body.user_id,
    category_id: req.body.category_id
  }

  const sql = `INSERT INTO todos SET ?`
  connection.query(sql,todoObj, err=>{
    if (err) throw err;
    res.send('New todo created :D')
  })
})

/* Actualizar un nombre de un todo para un usuario */
app.put('/todo/:id', (req, res) =>{

  const {name} = req.body.name;
  const {id} = req.params.id;
  const sql = `UPDATE todos SET name = '${name}' WHERE id = "${id}"`;

  connection.query(sql, err =>{
    if (err) throw err;
    res.send('Todo updated  :D')
  });

})


/* Eliminar un todo  */
app.delete('/todo/:id', (req,res) =>{
  const {id} = req.params.id;
  const sql = `DELETE FROM todos WHERE id = ${id}`
  connection.query(sql, err =>{
    if (err) throw err;
    res.send('Todo deleted D:');
  });
}) 
/* CRUD categorias */

/* Agregar una categoria a un usuario */
app.post('/category', (req,res) =>{

  categoryObj = {
    name: req.body.name,
    user_id: req.body.user_id
  }
  const sql = 'INSERT INTO category SET ?';

  connection.query(sql, categoryObj, err =>{
    if (err) throw err;
    res.send('Category creates');
  })
})

/* Actualizar una categoria */
app.put('/category/:id', (req,res) =>{
  const {name} = req.body.name;
  const {id} = req.body.id;
  const sql = `UPDATE category SET name = '${name}' WHERE id = ${id}`;

  connection.query(sql, err =>{
    if (err) throw err;
    res.send('Category updated')
  });
})


/* Borrar una categoria de un usuario */
app.delete('category/:id', (req,res) =>{
  const {id} = req.body.id;
  const sql = `DELETE FROM category WHERE id = ${id}`
  connection.query(sql, err =>{
    if (err) throw err;
    res.send('Category deleted D:');
  });
})
/* FIN CRUD CATEGORIAS  */


/* agregar, eliminar usuario */

/* Agregar un usuario */
app.post('/user', (req, res) => {
  const userObj ={
    name: req.body.name,
    pass: req.body.pass
  }

  const sql = `SELECT * FROM user WHERE name = "${userObj.name}"`
  const postUser = `INSERT INTO user SET ?`
  /* preguntar que no exista usuario, sino existe agregarlo :D */
  connection.query(sql, (err, results) =>{
    if (results.length > 0) res.send("El usuario existe");
    else{
      connection.query(postUser, userObj, err =>{
        if (err) throw err;
        res.send('User created :D')
      });
    }
  });
});


/* Eliminar un usuario (ARREGLAR) */
app.delete('/user/:id', (req,res) =>{
  /* eliminar usuario y todo lo que tenga que ver con el  NO LO BORRA BIEN ARREGLAR*/
  const {id} = req.params.id
  const sql = `DELETE FROM category,todos WHERE user_id = "${id}"`;
  const delUser = `DELETE FROM user WHERE id = "${id}"`;
  connection.query(sql, err =>{
    connection.query(delUser, err=>{
      if (err) throw err;
      res.send('User and post deleted')
    })
  })
}

)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})