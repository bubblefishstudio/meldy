
export default class Navigation {
	constructor(el) {
		this.app = el
	}

	async goto(page, data) {
		let PageLoader = (await import(`./views/${page}.js`)).default
		let dom = new PageLoader(this, data)
		this._replaceDOM(dom)
	}

	_replaceDOM(newDOM) {
		if (this.app.hasChildNodes())
			this.app.replaceChild(newDOM, this.app.firstChild)
		else
			this.app.appendChild(newDOM)
	}
}
