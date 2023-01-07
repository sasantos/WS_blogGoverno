const axios = require("axios");
const cheerio = require("cheerio");

const urlPai = "https://www.gov.br/economia/pt-br/assuntos/noticias";

function extrairDados(link) {
  axios.get(link).then((response) => {
    const dadoshtml = response.data;
    const $ = cheerio.load(dadoshtml);
    const titulo = $("h1").text();
    const dataPublicacao = $(".value").text();
    const texto = $('div[property="rnews:articleBody"]').text();

    const dados = { titulo, dataPublicacao, texto };

    console.log(dados);
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
