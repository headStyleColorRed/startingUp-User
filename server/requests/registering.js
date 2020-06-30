const express = require("express")
const router = express.Router()

// Modules
const User = require("../mongoDB/userModel.js")

router.post("/upload", async (req, res) => {
	let body = req.body
	const user = new User({
		email: body.email,
		username: body.username,
		age: body.age,
		image: req.file.filename,
		city: body.city,
	})
	
	await user.save().catch((err) => res.status(200).send({ code: "400", status: "User already exists"}))

	res.status(200).send({ code: "200", status: "User data uploaded succesfully"})
})


module.exports = router;