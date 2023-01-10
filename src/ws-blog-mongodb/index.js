const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const blog = require("./schema-blog");

const urlPai = "https://www.gov.br/economia/pt-br/assuntos/noticias";
mongoose
  .connect(
    "mongodb+srv://admin:rb867515@cluster0.e6bj8yi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("Conexão funcionando!");
  })
  .catch((error) => {
    console.log("Deu Problema!" + error);
  });

function salvandoDados(dt) {
  const novodado = new blog({
    titulo: dt.titulo,
    texto: dt.texto,
    //dataPublicacao:dt.dataPublicacao
  });
  blog.find({ titulo: dt.titulo }, function (err, otitulo) {
    if (err) throw err;
    if (otitulo.length === 0) {
      novodado.save();
      console.log("Dado não cadastrado!");
    } else {
      console.log("Dado já cadastrado!");
    }
  });
}

function extrairDados(link) {
  axios.get(link).then((response) => {
    const dadoshtml = response.data;
    const $ = cheerio.load(dadoshtml);
    const titulo = $("h1").text();
    const dataPublicacao = $(".value").text();
    const texto = $('div[property="rnews:articleBody"]').text();

    const dados = { titulo, dataPublicacao, texto };

    // console.log(dados);
    salvandoDados(dados);
  });
}

const links = axios.get(urlPai).then((response) => {
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

main();

// Fecha a conexao com o banco de dados
setTimeout(() => {
  mongoose.connection.close();
  console.log("Fechando conexões!");
}, 25000);
