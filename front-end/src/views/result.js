import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"
import AudioPlayer from "osmd-audio-player"

import BaseView from "./base.js"

export default class extends BaseView {

	setup() {
		// attach musicXML sheet and AudioPlayer
		const osmd = new OpenSheetMusicDisplay(this.view.querySelector("#sheet"))
		this.player = new AudioPlayer()
		this.data.text()
			.then(xml => osmd.load(xml))
			.then(()  => osmd.render())
			.then(()  => this.player.loadScore(osmd))
		// bind buttons
		this.view.querySelector("#play-btn").addEventListener("click", (e) => this.playScore(e))
		this.view.querySelector("#dw-btn").addEventListener("click", () => this.downloadScore())
		this.view.querySelector("#reset-btn").addEventListener("click", () => this.dropScore())
	}

	playScore(e) {
		if (this.player.state === "STOPPED" || this.player.state === "PAUSED")
			this.player.play()
		else
			this.player.stop()
	}

	downloadScore() {

	}

	dropScore() {
		this.player.stop()
		delete this.player
		this.navigator.goto("request")
	}

}
