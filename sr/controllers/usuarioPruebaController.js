//funciones asincronas,y capturar errores try catch
const listarUsuarios = require("../services/usuariosService")
const mostrarRutaUsuario = async(req, res)=>{
   try{
    const usuarios = await listarUsuarios()
    res.json(usuarios)


   }catch (error){
    res.status(500).json({mensaje: "Error al comunicarse con la base de datos.",Error:error.message})
   }

}

const registrarController =(req,res)=>{
    res.json({mensaje: "Ruta para registrarse."})
}
const loginController =(req,res)=>{
    res.json({mensaje: "Ruta para iniciar sesion."})
}
module.exports = {mostrarRutaUsuario,registrarController,loginController}