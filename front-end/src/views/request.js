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

	create_melody() {
		// update ui
		this.view.classList.remove("error")
		this.view.classList.add("loading")
		this.view.querySelector("#create").disabled = true
		// fetch
		let [v, a] = this.mood_picker.readValue()
		this.fetch_melody(v, a).then((response) => {
			this.navigator.goto("result", response)
		}).catch(e => {
			// update ui
			this.view.classList.remove("loading")
			this.view.classList.add("error")
			this.view.querySelector("#create").disabled = false
			setTimeout(() => this.view.classList.remove("error"), 1000)
		})
	}

	async fetch_melody(v, a) {
		try {
			let response = await fetch(BACKEND_URL)
			if (response.ok)
				return response
		} catch (e) {
			throw new Error(`Cannot reach back-end API (${BACKEND_URL} → http status: ${response.status})`)
		}
	}
}
