import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"

import BaseView from "./base.js"

export default class extends BaseView {

	setup() {
		// attach musicXML sheet
		const osmd = new OpenSheetMusicDisplay(this.view.querySelector("#sheet"))
		this.data.text()
			.then(xml => osmd.load(xml))
			.then(()  => osmd.render())
		// bind buttons
		this.view.querySelector("#play-btn").addEventListener("click", () => this.playScore())
		this.view.querySelector("#dw-btn").addEventListener("click", () => this.downloadScore())
		this.view.querySelector("#reset-btn").addEventListener("click", () => this.dropScore())
	}

	playScore() {

	}

	downloadScore() {

	}

	dropScore() {
		this.navigator.goto("request")
	}

}
