const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const usuarioSchema = require('../schemas/usuario.schema');
const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

const usuarios = {};

router.get("/", (req, res) => {
    res.json({usuarios: Object.values(usuarios)});
});

router.get("/:id", (req, res) => {
    res.json({usuario: usuarios[req.params.id]});
});

router.post("/", (req, res) => {
    const usuario = req.body;

    const validate = ajv.compile(usuarioSchema);
    const valid = validate(usuario);

    if (valid){
        const idUsuario = uuidv4();
        usuario.id = idUsuario;
        usuarios[idUsuario] = usuario;
        res.json({msg: "Usuario adicionado com sucesso."});
    } else {
        res.statusCode(400).json({msg: "Dados inválidos.", error: validate.error});
    }
});

router.put("/", (req, res) => {
    const id = req.query.id;
    if(id && usuarios[id]){
        const usuario = req.body;
        usuario.id = id;
        usuarios[id] = usuario;

        res.json({msg: "Usuario modificado com sucesso."});
    } else {
        res.status(404).json({msg: "Usuario nao encontrado"});
    }
});

router.delete("/", (req, res) => {
    const id = req.query.id;
    if(id && usuarios[id]){
        delete usuarios[id];
        res.json({mgs: "Usuario deletado com sucesso."})
    } else {
        res.status(404).json({msg:"Usuario nao encontrado."});
    }
});

module.exports = router;