const express = require("express")
const app = express();
const puerto = parseInt(process.env.PORT, 10) || 8889;
const bodyParser = require("body-parser")
const Cors = require("cors")
const mongoose = require("mongoose")
var dbLink = "mongodb://user_DB:27017/mongotest"


// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// Routes


// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))


// DataBase connection
mongoose.connect(dbLink, { useNewUrlParser: true }, (err) => {
	err ? console.log("User server encounted an error connecting to user_DB") : console.log("User server succesfully connected with user_DB");
})

app.get("/", (req, res) => {
	res.send("StartingUp-login is up and running! :D")
})