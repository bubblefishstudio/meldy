import Navigator from "./navigation.js"

window.addEventListener("DOMContentLoaded", () => {
	let nav = new Navigator(document.getElementById("app"))
	nav.goto("request")
	window.appNavigator = nav
})
