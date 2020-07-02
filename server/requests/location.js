const express = require("express")
const router = express.Router()
const Keys = require("../../private_keys.json")
const axios = require("axios")

// ++++++++++++++++ H T T P   M E T H O D S +++++++++++++++++++ //
router.post("/city-prediction", async (req, res) => {
	let body = req.body

	let googleCityPrediction = await getGoogleCityPrediction(body)

	res.json(googleCityPrediction)
})

// ++++++++++++++++ P R I V A T E   M E T H O D S +++++++++++++++++++ //

async function getGoogleCityPrediction(userData) {
	let googleKey = Keys.googleKey
	let URIPath = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userData.userInput}&types=geocode&language=${userData.language}&key=${googleKey}`

	if (userData.userInput.length < 3) { return "not enough charachters" }

	let promise = new Promise((resolve, reject) => {
		axios.get(URIPath).then((res) => {
			getFirstThreeSuggestions(res)
			let suggestions = getFirstThreeSuggestions(res)
			resolve(suggestions)
		})
	})

	let result = await promise
	return result
}

function getFirstThreeSuggestions(res) {
	let predictions = res.data.predictions
	let numberOfPredictions = 0
	let predictionArray = new Array()


	for (const prediction in predictions) {
		const element = predictions[prediction];

		predictionArray.push(element.description)

		numberOfPredictions++
		if (numberOfPredictions >= 3)
			break
	}

	return predictionArray
}

module.exports = router;