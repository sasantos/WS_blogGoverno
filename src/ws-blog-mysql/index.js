const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 15,
  host: "localhost",
  user: "root",
  password: "rb867515",
  database: "blog",
});

const salvandoDados = (dt) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "INSERT INTO  noticias set ?",
      dt,
      function (error, result, fields) {
        console.log("Cadastrando!");
        connection.release();

        if (error) throw error;
      }
    );
  });
};

function gravando(linhas) {
  const dados = {
    titulo: linhas.titulo,
    texto: linhas.texto,
  };

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `noticias` where `titulo` = ?",
      dados.titulo,
      function (error, result, fields) {
        let countResult = result.length;
        if (countResult === 0) {
          salvandoDados(dados);
        } else {
          console.log("Titúlo cadastrado");
        }
        if (error) throw error;
      }
    );
  });
}

const url = "https://www.gov.br/economia/pt-br/assuntos/noticias";

function extrairDados(link) {
  axios.get(link).then((response) => {
    const dadoshtml = response.data;
    const $ = cheerio.load(dadoshtml);
    const titulo = $("h1").text();
    // const dataPublicacao = $(".value").text();
    const texto = $('div[property="rnews:articleBody"]').text();

    const dados = { titulo, texto };

    //console.log(dados);

    gravando(dados);
  });
}

const links = axios.get(url).then((response) => {
  let dadoshtml = response.data;
  const $ = cheerio.load(dadoshtml);
  const dados = [];
  $('a[class="summary url"]').each((index, element) => {
    const link = $(element).attr("href");
    dados.push(link);
  });
  return dados;
});

async function main() {
  const lnks = await links;
  lnks.map((index, element) => {
    extrairDados(index);
  });
}

setTimeout(() => {
  pool.end();
}, 25000);

main();
