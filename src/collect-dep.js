import Directive from "./directive.js";
export default function walkDom(node,data){
	if(typeof node === "string") node = document.querySelector(node);
	if(node.hasChildNodes()){
		node.childNodes.forEach((child)=>{
			switch(child.nodeType){
				case 1:
					if(child.hasChildNodes()) walkDom(child,data);
					break;
				case 3:
					let attachValue = child.nodeValue.match(/{{[^\{\}]+}}/g);
					if(attachValue){
						Array.from(new Set(attachValue)).forEach((expression)=>{
							let directive = new Directive(child,expression);
							let keyPath = "data";
							let lastKey;
							expression.slice(2,-2).split(".").forEach((key,index,array)=>{
								if(index !== array.length - 1){
									keyPath += `["${key}"]`;
								}else{
									lastKey = key;
								}
							})
							let theSubj;
							try{
								theSubj = eval(keyPath + `["_subj"]`);
							}catch(e){
								console.warn(`不存在${keyPath}`);
							}
							if(theSubj){
								theSubj.add(lastKey,directive);
								theSubj.publish(lastKey,eval(`${keyPath}["${lastKey}"]`));
							}
						})
					}
			}
		})
	}
}