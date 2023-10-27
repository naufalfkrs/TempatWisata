const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controllers/user_controller`)

app.post("/login", userController.login)
app.post("/register", userController.register)

module.exports = app