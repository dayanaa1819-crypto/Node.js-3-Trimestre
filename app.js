const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PUERTO || 3000; 

// Middleware para parsear datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Leer archivo
const sistemaArchivo = require("fs");
const ruta = require("path");

const rutaArchivo = ruta.join(__dirname, "datos.json");

//libreria para subir archivos
const multer = require("multer");
//configurar el almacenamiento de archivos
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "misImagenes/")
    },
    filename: (req, file, cb) => {
        const extensionn = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extensionn}`)
    }
    })

const cargar = multer({ storage: almacenamiento });

app.get("/", (req, res) => { 
    res.send("Aprendices ficha 3407186"); 
});

// ENDPOINT PARA LISTAR APRENDICES (Solo lee el archivo)
app.get("/api/aprendices", (req, res) => {
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "No se puede leer archivo, o BD" });
        }
        const listaAprendices = JSON.parse(datos);
        res.status(200).json({ "mensaje": listaAprendices });
    });
}); 

// ENDPOINT PARA LISTAR UN APRENDIZ 
app.get("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "Lista 1 aprendiz"
    });
});

// ENDPOINT PARA CREAR APRENDICES (Aquí es donde se guarda en el archivo)
app.post("/api/aprendices", cargar.single("imagen"), (req, res) => {
    const datosAprendiz = req.body; 
    //agregar la ruta de la imagen
    datosAprendiz.imagen = req.file? `/misImagenes/${req.file.filename}` : "sin imagen"

//Leer archivo
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "No se puede leer archivo" });
        }

        const listaAprendices = JSON.parse(datos);
        listaAprendices.push(datosAprendiz); // Agregamos el nuevo aprendiz

        // Guardamos en el archivo JSON
        sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se puede escribir en el archivo" });
            }
            res.status(201).json({ 
                "mensaje": "Aprendiz creado", 
                "Datos Aprendiz": datosAprendiz 
            });
        });
    });
});

// ENDPOINT PARA EDITAR APRENDIZ
app.put("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "editar aprendices"
    });
});

// ENDPOINT PARA ELIMINAR APRENDIZ
app.delete("/api/aprendices/:id", (req, res) => {
    res.status(200).json({
        "mensaje": "eliminar aprendices"
    });
});

app.post("/rutaJson", (req, res) => {
    const todosDatos = req.body;
    const edad = req.body.edad2;
    const esMayor = edad >= 18 ? "es mayor" : "es menor";

    res.json({
        mensaje: esMayor,
        datosJson: todosDatos
    });
});

app.post("/rutaFormulario", (req, res) => {
    const todosDatos = req.body;
    const programa = req.body.programa;
    res.json({ Todosdatos: todosDatos, MiPrograma: programa });
});

app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});