const express = require("express");
const mongoose = require("mongoose");
require("../models/turmas");
const Turma = mongoose.model("turmas");
const router = express.Router();

router.get("/turmas", (req, res) => {
  Turma.find()
    .lean()
    .then((turmas) => {
      res.render("admin/turma/turma", { turmas: turmas });
    })
    .catch((error) => {
      res.send("There was an error: " + error);
    });
});

router.get("/turma/add", (req, res) => {
  res.render("admin/turma/addturma");
});

router.get("/editar_turma/:id", (req, res) => {
  Turma.findOne({ _id: req.params._id })
    .lean() 
    .then((turmas) => {
      res.render("admin/turma/editturma", { turmas: turmas });
    })
    .catch((error) => {
      res.send("This turma does not exist: " + error);
    });
});

router.post("/turma/nova", (req, res) => {
  const newTurma = new Turma({
    descricao: req.body.descricao,
  });

  newTurma
    .save()
    .then(() => {
      res.redirect("/rota_turma/turmas");
    })
    .catch((error) => {
      res.send("There was an error: " + error);
    });
});

router.post("/turma/editar_turma", (req, res) => {
  Turma.updateOne(
    { _id: req.body._id },
    {
      $set: {
        descricao: req.body.descricao,
      },
    }
  )
    .then(() => {
      res.redirect("/rota_turma/turmas");
    })
    .catch((error) => {
      res.send("This turma does not exist: " + error);
    });
});

router.get("/deletar_turma/:id", (req, res) => {
  Turma.deleteMany({_id:  req.params._id})
    .then(() => {
      res.redirect("/rota_turma/turmas");
    })
    .catch((error) => {
      res.send("This turma does not exist: " + error);
    });
});

module.exports = router;
