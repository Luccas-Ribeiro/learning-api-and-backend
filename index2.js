const express = require('express');
const rotaUsuario = require('./routes/usuario.routes');
const rotaPosts = require('./routes/post.routes')

const app = express();
app.use(express.json());

app.use('/usuarios', rotaUsuario);
app.use('/posts', rotaPosts);

app.get("/", (req, res) => {
    res.json({msg: "hello"});
});


app.listen(8080, () => {
    console.log('Servidor abrido na porta 8080.');
})