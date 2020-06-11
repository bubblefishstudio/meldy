export default class {
	constructor(nav, data, viewName) {
		this.navigator = nav
		this.data = data
		this.view = require(`dom-element-loader!./${viewName}.html`).default.cloneNode(true)
	}

	setup() {
		// this method gets called after the .view gets added to the DOM
	}
}
