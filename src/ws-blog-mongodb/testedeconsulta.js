const mongoose = require("mongoose");
const blog = require("./schema-blog");

const frase = "Acompanhe a posse da ministra do Planejamento e Orçamento, Simone Tebet";

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

  blog.find({'titulo':frase},function(err,otitulo){
    if(err) throw (err);
    if(otitulo.length === 0){
      console.log('Dado não cadastrado!')
    }else{
      console.log('Dado já cadastrado!')
    }
  })

  // Fecha a conexao com o banco de dados
  setTimeout(() =>{
    mongoose.connection.close();
    console.log('Fechando conexões!');
  },25000)
