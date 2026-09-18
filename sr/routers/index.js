//agrupar las rutas de mi aplicacion
const {Router} = require("express")
const enrutador = Router()
const pruebaRouter = require("./pruebaRouter")
const usuariosRouter = require("./usuarioRouter")

enrutador.use("/rutaPrueba", pruebaRouter)
//ejemplo
enrutador.use("/usuarios", usuariosRouter)

module.exports = enrutador
