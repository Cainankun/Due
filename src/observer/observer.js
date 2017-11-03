import {convert} from "../utils/utils.js";
import Subj from "../subj.js";
const ignoreProperty = ["_subj"];
export default class Observer{
	constructor(data){
		this.walk(data);
	}
	walk(obj){
		obj["_subj"] = new Subj();
		for(var key in obj){
			if(obj.hasOwnProperty(key) && ignoreProperty.indexOf(key) === -1){
				if(typeof obj[key] === "object"){
					this.walk(obj[key]);
				}
				convert(obj,key,obj[key]);
			}
		}
	}
}