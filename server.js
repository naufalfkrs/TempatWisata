const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require(`cors`)
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const userRoute = require(`./routes/user_route`)
const temparRoute = require(`./routes/tempat_route`)

app.use(`/user`, userRoute)
app.use(`/tempat`, temparRoute) 

app.listen(PORT, () => {
    console.log(`Berjalan di port ${PORT}`)
})