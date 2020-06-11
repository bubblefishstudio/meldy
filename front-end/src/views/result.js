import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"

let navigator, score

export default function(nav, data) {
	navigator = nav
	const view = require("dom-element-loader!./result.html").default
	// attach musicXML sheet
	score = data
	const osmd = new OpenSheetMusicDisplay(view.querySelector("#sheet"))
	osmd.load(score).then(() => osmd.render())
	// bind buttons
	view.querySelector("#play-btn").addEventListener("click", playScore)
	view.querySelector("#dw-btn").addEventListener("click", downloadScore)
	view.querySelector("#reset-btn").addEventListener("click", dropScore)
	// return DOM
	return view
}

function playScore() {

}

function downloadScore() {

}

function dropScore() {

}
