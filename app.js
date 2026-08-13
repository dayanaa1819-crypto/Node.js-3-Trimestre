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