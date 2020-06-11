import p5 from "p5"
import moodPickerSketch from "../p5/mood_picker.ts"

export default function() {
	// @ts-ignore
	const view = require("dom-element-loader!./request.html").default
	// attach mood-picker canvas
	new p5(moodPickerSketch, view.querySelector("#mood-picker"))
	// bind "inspire me" button
	view.querySelector("#create").addEventListener("click", create_melody)
	// return DOM
	return view
}

function create_melody(e) {

}

async function fetch_melody() {
	// @ts-ignore
	let response = await fetch(BACKEND_URL)
	if (response.ok)
		return response.body
	// @ts-ignore
	throw new Error(`cannot reach back-end API... url was ${BACKEND_URL} → ${response.status}`)
}
