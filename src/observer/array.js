export const dueArray = [];
const arrayMethod = ["push","pop","shift","unshift","reserve","splice"];
const origin = Array.prototype;
arrayMethod.forEach(function(method){
	dueArray[method] = function(){
		origin[method].apply(this,arguments);
		console.log(method);
	}
})
