import p5 from "p5"
import moodPickerSketch from "../p5/mood_picker_sketch.js"

import BaseView from "./base.js"

export default class extends BaseView {

	setup() {
		// attach mood-picker canvas
		this.mood_picker = new p5(moodPickerSketch, this.view.querySelector("#mood-picker"))
		// bind "inspire me" button
		this.view.querySelector("#create").addEventListener("click", () => this.create_melody())
	}

	create_melody(e) {
		let [v, a] = this.mood_picker.readValue()
		this.fetch_melody(v, a).then((response) => {
			this.navigator.goto("result", response)
		})
	}

	async fetch_melody(v, a) {
		let response = await fetch(BACKEND_URL)
		if (response.ok)
			return response
		throw new Error(`cannot reach back-end API... url was ${BACKEND_URL} → ${response.status}`)
	}
}
