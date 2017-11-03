export const convert = (obj,key,value)=>{
	Object.defineProperty(obj,key,{
		get(){
			return value
		},
		set(newValue){
			value = newValue;
			this._subj.publish(key,newValue);
		}
	})
}
