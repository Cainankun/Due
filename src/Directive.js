export function Directive(el,expression){
	this.el = el;
	this.expression = expression;
}
Directive.prototype.update = function(){
	this.el.nodeValue =
}
