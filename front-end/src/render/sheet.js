import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"

export function draw_score(score) {
	// target html container
	const div = document.createElement("div")
	document.body.appendChild(div)

	// render
	const osmd = new OpenSheetMusicDisplay(div)
	osmd.load(score.write()).then(() => osmd.render())
}
