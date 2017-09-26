import {convert} from "../utils/utils.js"
export default class Observer{
	constructor(data){
		this.walk(data);
	}
	walk(obj){
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				if(typeof obj[key] === "object"){
					this.walk(obj[key])
				}
				convert(obj,key,obj[key]);
			}
		}
	}
}
