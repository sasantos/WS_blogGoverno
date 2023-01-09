const axios = require("axios");
const cheerio = require("cheerio");

const urlPai = "https://www.gov.br/economia/pt-br/assuntos/noticias";

axios.get(urlPai).then((response) => {
  let dadoshtml = response.data;
  const $ = cheerio.load(dadoshtml);
  const dados = []
  $('a[class="summary url"]').each((index, element) => {
    const link = $(element).attr("href");
    dados.push(link)
    
  });
  console.log(dados);
});
