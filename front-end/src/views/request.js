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
		this.show_error(false)
		this.set_loading(true)
		// fetch
		let [v, a] = this.mood_picker.readValue()
		this.fetch_melody(v, a).then((response) => {
			this.navigator.goto("result", response)
			this.mood_picker.remove()
		}).catch(e => {
			// update ui
			this.set_loading(false)
			this.show_error(true)
		})
	}

	show_error(show) {
		this.view.classList.toggle("error", show)
		if (this.removeErrorClass)
			clearTimeout(this.removeErrorClass)
		if (show)
			this.removeErrorClass = setTimeout(() => this.view.classList.remove("error"), 2000)
	}

	set_loading(loading) {
		this.view.classList.toggle("loading", loading)
		this.view.querySelector("#create").disabled = loading
	}

	async fetch_melody(v, a) {
		try {
			let response = await fetch(BACKEND_URL + `?valence=${v}&arousal=${a}`)
			if (response.ok)
				return response
		} catch (e) {
			throw new Error(`Cannot reach back-end API (${BACKEND_URL} → http status: ${response.status})`)
		}
	}
}
