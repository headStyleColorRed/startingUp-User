const express = require("express")
const app = express();
const path = require("path")
const multer = require("multer")
const puerto = parseInt(process.env.PORT, 10) || 8889;
const bodyParser = require("body-parser")
const Cors = require("cors")
const mongoose = require("mongoose")
const environment = process.env.NODE_ENV
var mongoURI = new String()


// Modules
const User = require("./mongoDB/userModel.js")


// Set environment
if (environment == "production")
	mongoURI = "mongodb://user_DB:27017/mongoUser"
else
	mongoURI = "mongodb://localhost:27017/mongoUser"


// Middlewares
app.use(Cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(multer({
	dest: path.join(__dirname, "profilePictures")
}).single("image"))


// Routes
app.use("/user", require("./requests/registering"))
app.use("/location", require("./requests/location"))


// Open port
app.listen(puerto, () => console.log("Listening port " + puerto))

// Settings
app.set("views", path.join(__dirname, "views"))


// DataBase connection
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
	err ? console.log("User server encounted an error connecting to user_DB") : console.log("User server succesfully connected with user_DB");
})


// ++++++++++++++++ H T T P   M E T H O D S +++++++++++++++++++ //

app.get("/", (req, res) => {
	res.send("StartingUp-User is up and running! :D")
})

app.get("/users", async (req, res) => {					//	 B O R R A R
	const users = await User.find();					//	 B O R R A R
	res.json(users);									//	 B O R R A R
});

app.get("/deleteUsers", async (req, res) => {			//	 B O R R A R
	const users = await User.deleteMany();				//	 B O R R A R
	res.json("Users deleted");							//	 B O R R A R
});