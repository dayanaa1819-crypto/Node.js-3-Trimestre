const manejadorErrores= (error,req,res,next)=>{
    const codigoEstado = error.statusCode || 500
    const mensaje = error.message || "Error inesperado!!"
    console.error(`{ERROR}-${new Date().toISOString()}-$
    {codigoEstado}-${mensaje}`)
    //validar si hay más información
    if (error.stack){
        console.error (error.stack)
    }
//respuesta en json
res.json({
    Error : "Error", codigoEstado, mensaje,
    //dependiendo si estamos en desarrolo o producción
    ...(process.env.NODE_ENV === "development" && {stack: error.stack})
})
}

module.exports = manejadorErrores