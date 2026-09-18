const { error } = require('console');
const express = require('express');
const app= express();
require('dotenv').config();
const port = process.env.PUERTO || 3030;
const jwt = require ("jsonwebtoken")
//importacion  de middleware propios
const registroMiddleware = require("./sr/middleware/registroMiddleware")
const manejadoErrores = require('./sr/middleware/manejadorErrores');
const autenticacion = require("./sr/middleware/autenticacion")


//middleware para parsear datos del body
app.use(express.json()) 
app.use (express.urlencoded({extended:true}))
//middleware propios 
app.use((req, res, next)=>{
    console.log(`Tiempo milisegundos: ${Date.now()}`)
    console.log(`Fecha: ${new Date().toISOString()}`)
    next()
})
app.use(registroMiddleware)



//leer archivo
const sistemaArchivo = require("fs");
const ruta = require("path");

const rutaArchivo = ruta.join(__dirname, "datos.json");
// libreria para subir archivos
const multer =require("multer")
//consfigurar almacenamiento archivos
const almacenamiento=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"misImagenes/")
    },
    filename:(req,file,cb)=>{
        const extension = ruta.extname(file.originalname)
        cb(null,`${Date.now()}${extension}`)
    }

})

const cargar = multer({storage: almacenamiento})


app.get('/', (req, res) => {
    res.send('Aprendicez ficha 3407186');
});


//endpoint para listar aprendices
app.get('/api/aprendices', (req , res) => {
    //leer archivo json
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos)=>{
        if (error){
            return res.status(500).json({Error: "No se puede leer rutaArchivo, o BD"})
        }
        const listaAprendices = JSON.parse(datos)
        res.status(200).json ({"mensaje":listaAprendices})
    })
    
})
//endpoint para Listar un aprendiz

app.get('/api/aprendices/:id',(req, res) =>{
    res.status(200).json ({
        "mensaje":"Listar un aprendiz"
         
    })
})

//endpoint para crear aprendices

app.post('/api/aprendices',cargar.single("imagen"),(req, res) =>{
    const datosAprendiz = req.body 
    //AGREGAR LA RUTA DE LA IMAGEN
    datosAprendiz.imagen = req.file? `/misImagenes/${req.file.filename}` : "sin imagen"
    //leer archivo json
    sistemaArchivo.readFile(rutaArchivo, "utf-8", (error, datos)=>{
        if (error){
            return res.status(500).json({Error: "No se puede leer rutaArchivo, o BD"})
        }
        const listaAprendices = JSON.parse(datos)
        //adicionar el nuevo aprendiz a la lista
        listaAprendices.push(datosAprendiz)
        sistemaArchivo.writeFile(rutaArchivo,JSON.stringify(listaAprendices, null, 2), (error)=>{
            if (error){
            return res.status(500).json({Error: "No se puede escribir en el archivo, o BD"})
            }
            res.status(200).json ({"mensaje":"Aprendiz creado", "Datos Aprendiz": datosAprendiz})
        })
        
    })
    
})

//endpoint para editar aprendices

app.put('/api/aprendices/:id',(req, res) =>{
    res.status(200).json ({
        "mensaje":"Editar aprendices"
         
    })
})

//endpoint para Eliminar aprendices

app.delete('/api/aprendices/:id',(req, res) =>{
    res.status(200).json ({
        "mensaje":"Eliminar aprendices"
         
    })
})

//
app.post("/rutaJson", (req, res)=>{
    const todosDatos =req.body
    const edad =req.body.Edad
    if (edad >= 18) {
        res.json({"mensaje":"Es mayor de edad"})
    }else {
        res.json({"mensaje":"Es menor"})
    }
    res.json({datosJson: todosDatos})
})

app.post("/rutaFormularios", (req, res)=>{
    const todosDatos =req.body
    const programa = req.body.programa
    
    res.json({Todosdatos: todosDatos, Mi_Programa: programa})
})
//error provocado
app.get("/error",(req, res, next)=>{
    next(new Error("error intencional de mi app"))    
})
//ruta protegida
app.get("/api/rutaprotegida",autenticacion,(req, res)=>{
    res.status(200).json({mensaje: "esta es mi ruta protegida !!!"})
})
// login, inicio de sesion 
app.post("/api/login", (req, res) => {
    // simulador datos de la db
    const usuarioBd = {
        "usuario": "Dayana",
        "clave": "abc123"
    };

    const { usuario, clave } = req.body;

    // validar datos
    if (usuario !== usuarioBd.usuario || clave !== usuarioBd.clave) {
        return res.status(400).json({ mensaje: "Credenciales no válidas, usuario y clave incorrectos" });
    }

    // crear token
    const token = jwt.sign(
        { "usuario": usuario },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // Enviar respuesta al cliente (evita el Timeout)
    return res.status(200).json({
        mensaje: "Autenticación exitosa",
        token: token
    });
});
app.use(manejadoErrores)

app.listen(port, () => {
    console.log( `Servidor: http://localhost:${port}` );
});