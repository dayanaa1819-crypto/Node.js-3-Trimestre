//ruta de solo prueba
const {Router} = require("express")
const enrutador = Router()
const mostrarRutaUsuario = require("../controllers/usuarioPruebaController")
//funcion (req,res) debe ir en el controlador 
enrutador.get("/rutaUsuario",mostrarRutaUsuario)


module.exports = enrutador