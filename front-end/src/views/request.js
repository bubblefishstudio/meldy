import p5 from "p5"
import moodPickerSketch from "../p5/mood_picker_sketch.js"

export default class {

	constructor(nav, data) {
		this.navigator = nav
		const view = require("dom-element-loader!./request.html").default.cloneNode(true)
		// attach mood-picker canvas
		this.mood_picker = new p5(moodPickerSketch, view.querySelector("#mood-picker"))
		//view.querySelector("#mood-picker > canvas").style.visibility = "visible	"
		// bind "inspire me" button
		view.querySelector("#create").addEventListener("click", () => this.create_melody())
		// return DOM
		return view
	}

	create_melody(e) {
		let [v, a] = this.mood_picker.readValue()
		this.fetch_melody(v, a).then((musicxml) => {
			this.navigator.goto("result", musicxml)
		})
	}

	async fetch_melody(v, a) {
		let response = await fetch(BACKEND_URL)
		if (response.ok)
			return response.body
		throw new Error(`cannot reach back-end API... url was ${BACKEND_URL} → ${response.status}`)
	}
}
