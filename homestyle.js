//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
 
 
//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3001;
 
 
//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/homestyle',
{   useNewUrlParser: true,
    useUnifiedTopology: true
});
 
 
//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});
 
 
const Usuario = mongoose.model("Usuario", usuarioSchema);
 
 
//criando a segunda model
const produtodecoracaoSchema = new mongoose.Schema({
    id_produtodecoracao : {type : String, required : true},
    descricao : {type : String},
    fornecedor : {type : String},
    dataFabricacao : {type : Date},
    quantidadeEstoque : {type : Number}
});
 
 
const produtodecoracao = mongoose.model("produtodecoracao", produtodecoracaoSchema);
 
 
//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
 
 
//mandando para banco
    const usuario = new Usuario({
        email : email,
        senha : senha,
    })
 
    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }
});
 
app.post("/cadastroprodutodecoracao", async(req, res)=>{
    const id_produtodecoracao = req.body.id_produtodecoracao;
    const descricao = req.body.descricao;
    const fornecedor = req.body.marca;
    const dataFabricacao = req.body.dataFabricacao;
    const quantidadeEstoque = req.body.quantidadeEstoque
    
 if(senha==null||email==null){
    return res.status(400).json({error: "preencha todos os dados"})
}
if(id_produtodecoracao==null||descricao==null||fornecedor==null||dataFabricacao==null||quantidadeEstoque==null||nascimento==null){
    return res.status(400).json({error: "preencha todos os dados"})
}

const emailexiste= await Usuario.findOne({email:email})
if(emailexiste){
    return res.status(400).json({error:"o email cadastrado ja existe "})
}

if(quantidadeEstoque<0){
    return res.status(400).json({error: "a quantidade informado é menor que 0"})
}
else if(quantidadeEstoque>=43){
    return res.status(400).json({error: "a quantidade informado é maior ou igual a 43"})
}

    //mandando para banco
    const produtodecoracao = new produtodecoracao({
        id_produtodecoracao : id_produtodecoracao,
        descricao : descricao,
        fornecedor : fornecedor,
        dataFabricacao : dataFabricacao,
        quantidadeEstoque : quantidadeEstoque
    })
 
    try{
        const newprodutodecoracao = await produtodecoracao.save();
        res.json({error : null, msg : "Cadastro ok", produtodecoracaoId : newprodutodecoracao._id});
    } catch(error){
        res.status(400).json({error});
    }
});

 
//rota para o get de cadastro
app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname +"cadastrousuario.html");
});
 
//rota para o get de cadastro
app.get("/cadastroprodutodecoracao", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroprodutodecoracao.html");
});
 
//rota raiz - inw
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});
 
//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});