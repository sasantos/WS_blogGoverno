const mysql = require("mysql2");

const titulo = 'Governo Central '

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "rb867515",
  database: "blog",
});

const consulta = (msg) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `noticias` where `titulo` = ?",
      msg,
      function (error, result, fields) {
        let countResult = result.length;
        if (countResult === 0) {
          console.log("Titúlo não cadastrado");
        } else {
          console.log("Titúlo cadastrado");
        }
        if (error) throw error;
      }
    );
  });
};

consulta(titulo)