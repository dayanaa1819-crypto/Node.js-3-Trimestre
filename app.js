const express = require('express');

const app = express();

const port = 3000;

app.get("/", (_, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});