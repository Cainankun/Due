import Observer from "./observer/observer.js";
import walkDom from "./collect-dep.js";
class Due{
	constructor({data,el}){
		this.data = data;
		new Observer(data);
		walkDom(el,data);
	}
}
const app = new Due({
	el: "#app",
	data: {
		a: 1,
		b: {
			c: 2
		}
	}
})
window.app = app;