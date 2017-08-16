function Element (tagName,props,childs){
	this.tagName = tagName;
	this.props = props;
	this.childs = childs;
}
Element.prototype.render=function(){
	var tagName = this.tagName,
		props =  this.props || {},
		childs = this.childs || [];
	var el = document.createElement(tagName);
	for(var prop in props){
		el.setAttribute(prop,props[prop]);
	}
	if(typeof childs === "string"){
		var text = document.createTextNode(childs);
		el.append(text);
	}else{
		childs.forEach(function(child){
			if(child instanceof Element){
				el.append(child.render());
			}else{
				var text = document.createTextNode(child);
				el.append(text);
			}
		})
	}
	return el
}
function el(tagName,props,childs){
	return new Element(tagName,props,childs)
}
