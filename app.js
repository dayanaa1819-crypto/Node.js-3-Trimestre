const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PUERTO || 3000; 

//middleware para parsear datos del boddy
app.use(express.json())
app.use (express.urlencoded({extended:true}))

app.get("/", (req, res) => { 
    res.send("Aprendicez ficha 3407186"); 
});

//EMPOINT PARA LISTAR APRENDICES 
app.get ("/api/aprendices", (req, res) => {
    res.status (200).json({
        "mensaje": "Lista de aprendices"
    })
})

//EMPOINT PARA LISTAR UN APRENDIZ 
app.get ("/api/aprendices/:id", (req, res) => {
    res.status (200).json({
        "mensaje": "Lista 1 aprendiZ"
    })
})

//EMPOINT PARA CREAR APRENDICES 
app.post ("/api/aprendices", (req, res)=>{
    res.status(201).json ({
        "mensaje": "se creo aprendiz"
    })
})

//EMPINT PARA EDITAR APRENDIZ
app.put ("/api/aprendices/:id", (req, res)=>{
    res.status(200).json({
        "mensaje": "editar aprendices"
    })
})

//EMPOINT PARA ELIMINAR APRENDIZ
app.delete ("/api/aprendices/:id", (req, res)=>{
    res.status(200).json({
        "mensaje": "eliminar aprendices"
    })
})

app.post ("/rutaJson", (req, res) =>{
    const todosDatos = req.body
    const edad = req.body.edad2
    if (edad=>18) {
        res.json({mensaje: "es mayor"})
    } else {
        res.json({mensaje:"es menor"})
    }
    res.json ({datosJson: todosDatos })
})

app.post ("/rutaFormulario", (req, res) =>{
    const todosDatos = req.body
    const programa = req.body.programa
    res.json ({Todosdatos:todosDatos, MiPrograma: programa})
})

app.listen(port, () => { 
    console.log( `SERVIDOR: http://localhost:${port}`); 
}); 
