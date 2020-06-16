import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"
import AudioPlayer from "osmd-audio-player"

import BaseView from "./base.js"

export default class extends BaseView {

	setup() {
		// attach musicXML sheet and AudioPlayer
		const osmd = new OpenSheetMusicDisplay(this.view.querySelector("#sheet"))
		this.player = new AudioPlayer()
		this.data.text()
			.then(xml => {
				this.musicxml = xml
				osmd.load(this.musicxml)
			})
			.then(() => osmd.render())
			.then(() => this.player.loadScore(osmd))
		// bind buttons
		this.view.querySelector("#play-btn").addEventListener("click", (e) => this.playScore(e))
		this.view.querySelector("#dw-btn").addEventListener("click", () => this.downloadScore())
		this.view.querySelector("#reset-btn").addEventListener("click", () => this.dropScore())
	}

	playScore(e) {
		if (this.player.state === "STOPPED" || this.player.state === "PAUSED") {
			this.player.play()
			e.target.textContent = "Stop"
		} else {
			this.player.stop()
			e.target.textContent = "Play"
		}
	}

	downloadScore() {
		// create blob object
		let url = URL.createObjectURL(new Blob([this.musicxml], {type: "application/vnd.recordare.musicxml"}))
		// create fake anchor to download the blob
		let anchor = document.createElement("a")
		anchor.setAttribute("href", url)
		anchor.setAttribute("download", "generated-score.musicxml")
		anchor.click()
	}

	dropScore() {
		this.player.stop()
		delete this.player
		this.navigator.goto("request")
	}

}
