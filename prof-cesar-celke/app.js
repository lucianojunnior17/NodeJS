const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const moment = require('moment');
const Pagamento = require("./models/Pagamento")

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  helpers: {
    formatDate: (date) => {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}))

app.set('view engine','handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//rotas

app.get('/pagamento', function(req, res) {
  Pagamento.findAll({order: [['id','DESC']]}).then(function(pagamentos){
      res.render('pagamento', {pagamentos:pagamentos});
  })
  
});

app.get('/del-pagamento/:id' , function(req, res) {
  Pagamento.destroy({
      where: {'id': req.params.id}
  }).then(function(){
    res.send('Apagado com Sucesso')
  }).catch(function(erro){
    res.send('Não foi possivel apagar')
    res.redirect('/src/index.html')
  })

});

app.get('/cad-pagamento', function(req, res) {
  res.render('cad-pagamento');
});

app.post('/add-pagamento',function(req, res){
  Pagamento.create({
    nome:req.body.nome,
    valor: req.body.valor
  }).then(function( ){
    res.redirect('/pagamento')

    //só mostrar a msg
    //res.send("Pagamento Cadastrato co sucesso")
  }).catch(function(){
     res.send("Erro Não foi possivel fazer o Cadastro" + error)
  });


  //só mostra os dados
  //res.send("Nome: " + req.body.nome + "<br>valor: " + req.body.valor + "<br>")

})
app.listen(3000);