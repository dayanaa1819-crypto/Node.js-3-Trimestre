//ruta de solo prueba
const {Router} = require("express")
const enrutador = Router()
const{mostrarRutaUsuario, registrarController, loginController} = require("../controllers/usuarioPruebaController")
//funcion (req,res) debe ir en el controlador 
enrutador.get("/listado",mostrarRutaUsuario)

enrutador.get("/registrar",registrarController)
enrutador.get("/login",loginController)

module.exports = enrutador