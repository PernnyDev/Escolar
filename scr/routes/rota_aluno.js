/*1°) Importações*/
const express = require("express");
const mongoose = require("mongoose");
require("../models/turmas");
require("../models/alunos");
//vamos carregar nosso modelo
const Turma = mongoose.model("turmas");
const Aluno = mongoose.model("alunos");
const router = express.Router();
//_____________ Rotas dos Alunos __________________
/*2°) Abre e carrega todas informações do aluno no formulário aluno.handlebars */
router.get("/alunos", (req, res) => {
  Aluno.find()
    .lean()
    .then((alunos) => {
      res.render("admin/aluno/aluno", { alunos: alunos });
    })
    .catch((error) => {
      res.send("There was an error: " + error);
    });
});
/* 3°) Abre o Formulário addaluno.handlebars */
router.get("/aluno/add", (req, res) => {
  //pega as turmas cadastradas para popular o select do html
  Turma.find()
    .lean()
    .then((turmas) => {
      var nturmas = JSON.parse(JSON.stringify(turmas));
      res.render("admin/aluno/addaluno", { turmas: nturmas });
    });
});
/* 4°) Abre e preenche o formulário editaluno.handlebars com informações do id passado */
router.get("/editar_aluno/:id", (req, res) => {
  Tarefas.findOne({ _id: req.params._id })
    .lean()
    .then((alunos) => {
      //pega as turmas cadastradas para popular o select do html
      res.render("admin/aluno/editaluno");
    });
});

/* 5°) Recebe as informações do botão que está no addaluno.handlebar 
e efetua o cadastro no banco de dados, depois ele volta para a listagem dos alunos */
router.post("/aluno/nova", (req, res) => {
  const aluno = new Aluno();
  aluno.matricula = req.body.matricula;
  aluno.nome = req.body.nome;
  aluno.descricao = req.body.descricao; // Adjusted code
  aluno
    .save()
    .then(() => {
      res.redirect("/rota_aluno/alunos");
    })
    .catch((erro) => {
      res.send("Houve um erro: " + erro);
    });
});

/* 6°) Recebe as informações do botão que está no editaluno.handlebar 
e efetua a alteração no banco de dados. Volta para listagem de alunos */
router.post("/aluno/editar_aluno", (req, res) => {
  Aluno.updateOne(
    {_id:req.body._id},
    {
      $set: { nome: req.body.nome,matricula: req.body.matricula, descricao: req.body.descricao},
    }
  )
    .then(() => {
      res.redirect("/rota_aluno/alunos");
    })
    .catch((erro) => {
      res.send("Este aluno não existe " + erro);
    });
});
/* 7°) No form aluno.handlebars que lista os alunos possui um botão para deletar 
Ele deleta informação e refaz a lista no aluno.handlebars */
router.get("/deletar_aluno/:id", (req, res) => {
  Aluno.deleteMany({ _id: req.params.id  })
    .then(() => {
      res.redirect("/rota_aluno/alunos");
    })
    .catch((err) => {
      res.render("Esse aluno não existe");
    });
});
/*______ Fim das rotas do aluno ___________*/
module.exports = router;
