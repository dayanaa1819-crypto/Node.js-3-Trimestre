const express = require('express');  
const app = express(); 
require('dotenv').config();
const port = process.env.PUERTO || 3000; 

const jwt = require('jsonwebtoken');
// Importación de middleware propios 
const registroMiddleware = require("./middleware/registroMiddleware");
const manejadorErrores = require("./middleware/manejadorErrores");
const autenticacion = require("./middleware/autenticacion");

// Middleware para parsear datos del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware logger propio
app.use((req, res, next) => {
    console.log(`Tiempo milisegundos: ${Date.now()}`);
    console.log(`Fecha: ${new Date().toISOString()}`);
    next();
});
app.use(registroMiddleware);

// Archivos del sistema
const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaArchivo = ruta.join(__dirname, "datos.json");

// Configuración de Multer
const multer = require("multer");

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misImagenes/");
    },
    filename: (req, file, cb) => {
        const extension = ruta.extname(file.originalname); 
        cb(null, `${Date.now()}${extension}`);
    }
});
const cargar = multer({ storage: almacenamiento });

// Rutas base
app.get("/", (req, res) => { 
    res.send("Api resta aprendices"); 
});

// ENDPOINT PARA LISTAR APRENDICES 
app.get("/api/aprendices", (req, res) => {
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "No se puede leer archivo o BD" }); 
        }
        const listaAprendices = JSON.parse(datos);
        return res.status(200).json({ "mensaje": listaAprendices });
    });
});

// ENDPOINT PARA LISTAR UN APRENDIZ 
app.get("/api/aprendices/:id", (req, res) => {
    return res.status(200).json({ "mensaje": "Lista 1 aprendiz" });
});

// ENDPOINT PARA CREAR APRENDICES 
app.post("/api/aprendices", cargar.single("imagen"), (req, res) => {
    const datosAprendiz = req.body;
    datosAprendiz.imagen = req.file ? `/misimagenes/${req.file.filename}` : "sin imagen";
    
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "No se puede leer archivo o BD" }); 
        }
        const listaAprendices = JSON.parse(datos);
        listaAprendices.push(datosAprendiz);
        
        sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se puede escribir en el archivo o BD" });
            }
            return res.status(200).json({ "mensaje": "Aprendiz creado", "Datos Aprendiz": datosAprendiz });
        });
    });
});

// ENDPOINT PARA EDITAR APRENDIZ
app.put("/api/aprendices/:id", (req, res) => {
    return res.status(200).json({ "mensaje": "editar aprendices" });
});

// ENDPOINT PARA ELIMINAR APRENDIZ
app.delete("/api/aprendices/:id", (req, res) => {
    return res.status(200).json({ "mensaje": "eliminar aprendices" });
});

// Ruta de prueba de error
app.get("/error", (req, res, next) => {
    next(new Error("Error intencional de mi app"));
});

// Ruta protegida con JWT
app.get("/api/rutaprotegida", autenticacion, (req, res) => {
    return res.status(200).json({ 
        mensaje: "¡Esta es mi ruta protegida!",
        usuario: req.usuario 
    });
});

// ENDPOINT LOGIN CORREGIDO
app.post("/api/login", (req, res) => {
    const usuario8d = {
        "usuario": "Dayana",
        "clave": "abc123"
    };

    const { usuario, clave } = req.body;

    // 1. Validar si los datos recibidos coinciden
    if (usuario !== usuario8d.usuario || clave !== usuario8d.clave) {
        return res.status(400).json({ mensaje: "Credenciales no válidas, usuario y clave incorrectos" });
    }

    // 2. Generar JWT pasando la variable 'usuario'
    const token = jwt.sign(
        { usuario: usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
});

// Middleware centralizado de errores
app.use(manejadorErrores);

app.listen(port, () => { 
    console.log(`SERVIDOR: http://localhost:${port}`); 
});