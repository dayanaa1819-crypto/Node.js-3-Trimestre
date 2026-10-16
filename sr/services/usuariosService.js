ormPrisma = require('../config/conexion')
const listarUsuarios = async () => {
    const usuarios = await ormPrisma.usuarios.findMany()
    return usuarios
}
module.exports = listarUsuarios
