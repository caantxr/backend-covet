

const express = require("express")
const cors = require("cors")
const dbConnect = require('./src/config/mongo')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3000

//aqui invoamos a las rutas!

//TODO localhost/api/-----
app.use("/api",require("./src/routes"))

app.listen(port, () => {
    console.log(`tu app esta lista por http://localhost:${port}`)
})

dbConnect()