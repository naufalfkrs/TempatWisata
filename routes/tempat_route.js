const express = require(`express`)
const app = express()
app.use(express.json())
const tempatController = require(`../controllers/tempat_controller`)
const auth = require(`../auth/auth`)

app.get("/", auth.authVerify, tempatController.getAllTempat)
app.post("/", auth.authVerify, tempatController.addTempat)
app.put("/:id", auth.authVerify, tempatController.updateTempat)
app.delete("/:id", auth.authVerify, tempatController.deleteTempat)

module.exports = app