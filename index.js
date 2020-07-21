const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const connection = require('./database/database');
const question = require("./database/Question");
const answer = require("./database/Answer");
const { render } = require("ejs");

connection.authenticate().then(()=>{
    console.log('conexão estabelecida.');
}).catch((error) => {
    console.log(error);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(req,res) => {
    question.findAll({ raw:true, order:[
        ['id','DESC']
    ] }).then((questions) =>{
        res.render("index", {
            questions:questions
        });
    })
});

app.get("/ask",(req,res) => {res.render("ask.ejs");});

app.post("/saveQuestion", (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
   question.create({
    title: title,
    description: description
   }).then(()=>{
       res.redirect("/");
   });
});

app.get('/question/:id', (req,res) =>{
    var id = req.params.id;
    question.findOne({
        where: {id:id}
    }).then(question =>{
        if(question != undefined) {
            res.render("question", {
                question:question
            })
        }else{
            res.redirect("/")
        }
    })
});

app.listen(8080, () => { console.log("app rodando.")});
