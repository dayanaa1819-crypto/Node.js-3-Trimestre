const jswtoken = require("jsonwebtoken");

const autenticacion = (req, res, next) => {
    // Requerir o capturar el token agregando un espacio en el split
    const token = req.header("autenticacion")?.split(" ")[1] || req.header("autenticacion");

    if (!token) {
        return res.status(401).json({ Error: "Acceso denegado, no provee token." });
    }

    // Verificar con la clave secreta
    jswtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            return res.status(403).json({ Error: "Token inválido" });
        }
        req.usuario = usuario;
        next();
    });
};

module.exports = autenticacion;