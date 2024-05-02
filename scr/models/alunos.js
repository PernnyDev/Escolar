require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Aluno schema
const AlunoSchema = new mongoose.Schema({
    matricula: {
        type: Number
    },
    nome: {
        type: String
    },
    descricao: {
        type: String
    }   
});

// Create the Aluno model
mongoose.model('alunos', AlunoSchema);

