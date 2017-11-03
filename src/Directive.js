export default function Directive(el,expression){
	this.el = el;
	this.expression = expression;
}
Directive.prototype.update = function(newValue){
	const pattern = new RegExp(this.expression,"gm");
	this.el.nodeValue = this.el.nodeValue.replace(pattern,newValue);
	this.expression = newValue;
	console.log(this.expression)
}