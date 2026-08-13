import express from 'express';
import "dotenv/config"

const app = express();

const port = process.env.PUERTO|| 3000;

app.get("/", (_, res) => {
    res.send("Aprendices Sena 3407186");
});
app.get("/ruta1", (req, res) => {
    res.send('<h1>Usando res.send</h1>')
})
app.get("/ruta2", (req, res) => {
    res.json({"dev":"node --watch app.js", "script":"node app.js"})
})
app.get("/ruta3/:nombre/:apellido", (req, res) => {
    const nameUsuario = req.params.nombre
    const apellido =req.params.apellido
    res.json({"usuario": nameUsuario,"apellido": apellido})
})    

app.get("/ruta4", (req, res) => {
    const numero = req.query.phone || 3209423122
    const orden = req.query.orden || "sin orden"
    const pagina = req.query.pagina || 1
    res.send(`<h1>Listado Aprendices</h1>
        <h2>El listado en orden: ${orden}</h2>
        <p>Pagina ${pagina}</p>
        <h3>Numero: ${numero}</h3>`)
})


app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});
/*Ejercicios*/
/*Ejercicio 1*/

app.get("/saludo/:nombre", (req, res) => {
    const nombre = req.params.nombre;

    if (nombre.length < 3) {
        return res.status(400).send("El nombre debe tener al menos 3 caracteres.");
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});

/*Ejercicio 2*/
app.get("/productos/:nombre", (req, res) => {
    const nombreProducto = req.params.nombre;

    res.json({
        "id": 101,
        "nombre": nombreProducto,
        "cantidadStock": 45,
        "precioUnitario": 29.99,
        "categoria": "Electrónica"
    });
});

/*Ejercicio 3*/
app.get("/productos/:categoria/:id", (req, res) => {
    const categoria = req.params.categoria;
    const idProducto = req.params.id;

    res.json({
        "producto": idProducto,
        "categoria": categoria,
        "servidor": "Servidor Sena-Express"
    });
});

/*Ejercicio 4*/

app.get("/usuarios/:id/posts", (req, res) => {
    const idUsuario = req.params.id;
    const orden = req.query.orden || "asc";

    let posts = [
        { "id": 1, "titulo": "Primer post" },
        { "id": 2, "titulo": "Segundo post" },
        { "id": 3, "titulo": "Tercer post" }
    ];

    if (orden === "desc") {
        posts.reverse();
    }

    res.json({
        "usuario": idUsuario,
        "orden": orden,
        "publicaciones": posts
    });
});
/*Ejercicio 5*/
app.get("/usuarios/:id/:posts_id/comentarios", (req, res) => {
    const idUsuario = req.params.id;
    const idPost = req.params.posts_id;
    const orden = req.query.orden || "asc";

    let comentarios = [
        { "id": 101, "autor": "Carlos", "texto": "Excelente post" },
        { "id": 102, "autor": "Ana", "texto": "Muy interesante" },
        { "id": 103, "autor": "Luis", "texto": "Muchas gracias" }
    ];

    if (orden === "desc") {
        comentarios.reverse();
    }

    res.json({
        "usuario": idUsuario,
        "post": idPost,
        "orden": orden,
        "comentarios": comentarios
    });
});