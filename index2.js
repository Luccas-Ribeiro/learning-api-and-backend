const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const alunos = {};

app.get("/", (req, res) => {
    res.json({msg: "hello"});
});

app.get("/alunos", (req, res) => {
    res.json({alunos: Object.values(alunos)});
});

app.get("/alunos/:id", (req, res) => {
    res.json({aluno: alunos[req.params.id]});
});

app.post("/alunos", (req, res) => {
    const aluno = req.body;
    const idAluno = uuidv4();
    aluno.id = idAluno;
    alunos[idAluno] = aluno;
    res.json({msg: "Aluno adicionado com sucesso."});
});

app.put("/alunos", (req, res) => {
    const id = req.query.id;
    if(id && alunos[id]){
        const aluno = req.body;
        aluno.id = id;
        alunos[id] = aluno;

        res.json({msg: "Aluno modificado com sucesso."});
    } else {
        res.status(404).json({msg: "Aluno nao encontrado"});
    }
});

app.delete("/alunos", (req, res) => {
    const id = req.query.id;
    if(id && alunos[id]){
        delete alunos[id];
        res.json({mgs: "Aluno deletado com sucesso."})
    } else {
        res.status(404).json({msg:"Aluno nao encontrado."});
    }
});

app.listen(8080, () => {
    console.log('Servidor abrido na porta 8080.');
})