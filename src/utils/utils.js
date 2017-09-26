export const convert = (obj,key,value)=>{
	Object.defineProperty(obj,key,{
		get(){
			console.log("get:",key);
			return value
		},
		set(newValue){
			console.log("set:",key);
			value = newValue;
		}
	})
}
