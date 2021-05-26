const express = require("express");
const RoutesEntidades = require("./src/routes/entidades")
const RoutesCupos = require("./src/routes/cupos")
const funciones = require("./src/routes/funciones")

const app = express()

app.use(express.json())

app.use('/entidades', RoutesEntidades)
app.use('/cupos', RoutesCupos)
app.use('/funcion', funciones)
//app.use('/movimientos', RoutesMovimientos)

const PORT = process.env.PORT || 3000

app.listen(PORT,  () => {
    console.log(`server runnig on  port ${PORT}`)
})
