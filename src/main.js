import Observer from "./observer/observer.js";
import {dueArray} from "./observer/array.js";
let a = [];
a.__proto__ = dueArray;
a.push(2);
a.push(3);
console.log(Array.isArray)
