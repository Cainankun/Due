import Directive from "./directive.js";
export default class {
	publish(key,value){
		if(this[key] instanceof Array){
			this[key].forEach((directive)=>{
				directive instanceof Directive && directive.update(value);
			})
		}
	}
	add(key,directive){
		if(this[key] instanceof Array){
			this[key].push(directive);
		}else{
			this[key] = [];
			this[key].push(directive);
		}
	}
}