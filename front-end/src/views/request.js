import p5 from "p5"
import moodPickerSketch from "../p5/mood_picker_sketch.js"

let mood_picker

export default function() {
	const view = require("dom-element-loader!./request.html").default
	// attach mood-picker canvas
	mood_picker = new p5(moodPickerSketch, view.querySelector("#mood-picker"))
	// bind "inspire me" button
	view.querySelector("#create").addEventListener("click", create_melody)
	// return DOM
	return view
}

function create_melody(e) {
	console.log(`awesome! this is the value I read: ${mood_picker.readValue()}`)
}

async function fetch_melody() {
	let response = await fetch(BACKEND_URL)
	if (response.ok)
		return response.body
	throw new Error(`cannot reach back-end API... url was ${BACKEND_URL} → ${response.status}`)
}
