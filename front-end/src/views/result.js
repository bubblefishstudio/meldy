import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"

export default class {

	constructor(nav, data) {
		this.navigator = nav
		const view = require("dom-element-loader!./result.html").default.cloneNode(true)
		// attach musicXML sheet
		this.score = data
		const osmd = new OpenSheetMusicDisplay(view.querySelector("#sheet"))
		osmd.load(this.score).then(() => osmd.render())
		// bind buttons
		view.querySelector("#play-btn").addEventListener("click", () => this.playScore())
		view.querySelector("#dw-btn").addEventListener("click", () => this.downloadScore())
		view.querySelector("#reset-btn").addEventListener("click", () => this.dropScore())
		// return DOM
		return view
	}

	playScore() {

	}

	downloadScore() {

	}

	dropScore() {
		this.navigator.goto("request")
	}

}
