const axios = require("axios");
const cheerio = require("cheerio");

const urfFilho = 'https://www.gov.br/economia/pt-br/assuntos/noticias/2023/janeiro/simone-tebet-assume-ministerio-do-planejamento-e-orcamento-sob-o-compromisso-de-2018dar-visibilidade-aos-invisiveis2019'

axios.get(urfFilho).then( response =>{
   const dadoshtml = response.data
   const $ = cheerio.load(dadoshtml)
   const titulo = $('h1').text()
   const dataPublicacao = $('.value').text()
  const texto = $('div[property="rnews:articleBody"]').text()

  const dados = {titulo,dataPublicacao,texto}

  console.log(dados)
})
