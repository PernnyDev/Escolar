require ('./db');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Turma schema
const Turma = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    }
});

// Create the Turma model
mongoose.model('turmas', Turma);

