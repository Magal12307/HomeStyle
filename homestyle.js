//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/homestyle',
{   useNewUrlParser: true,
    useUnifiedTopology: true
});


//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});


const Usuario = mongoose.model("Usuario", UsuarioSchema);

const ProdutodecoracaoSchema = new mongoose.Schema({
    id_produtodecoracao: {type : String, required : true},
    Descricao: {type : String},
    Fornecedor: {type : String},
    Data_fabricacao: {type : Date},
    Quantidade_estoque: {type : Number}
});


const Produtodecoracao = mongoose.model("Produtodecoracao", ProdutodecoracaoSchema);


//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    const Usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newUsuario = await Usuario.save();
        res.json({error : null, msg : "Cadastro ok", pessoaId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.post("/cadastroprodutodecoracao", async(req, res)=>{
    const id_produtodecoracao = req.body.id_produtodecoracao;
    const Descricao = req.body.Descricao
    const Fornecedor = req.body.Fornecedor
    const Data_fabricacao = req.body.Data_fabricacao
    const Quantidade_estoque = req.body.Quantidade_estoque  

    const Usuario = new Usuario({
        id_produtodecoracao: id_produtodecoracao,
        Descricao: Descricao ,
        Fornecedor: Fornecedor,
        Data_fabricacao: Data_fabricacao,
        Quantidade_estoque: Quantidade_estoque
    })


    try{
        const newProdutodecoracao = await Produtodecoracao.save();
        res.json({error : null, msg : "Cadastro ok", });
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})


//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
