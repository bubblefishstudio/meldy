import v1 from "./views/request.js"

window.addEventListener("load", () => {
	let app = document.getElementById("app")
	let dom1 = v1()
	if (app.hasChildNodes())
		app.replaceChild(dom1, app.firstChild)
	else
		app.appendChild(dom1)
})
