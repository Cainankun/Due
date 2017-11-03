/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _observer = __webpack_require__(1);

var _observer2 = _interopRequireDefault(_observer);

var _collectDep = __webpack_require__(4);

var _collectDep2 = _interopRequireDefault(_collectDep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Due = function Due(_ref) {
	var data = _ref.data,
	    el = _ref.el;

	_classCallCheck(this, Due);

	this.data = data;
	new _observer2.default(data);
	(0, _collectDep2.default)(el, data);
};

var app = new Due({
	el: "#app",
	data: {
		a: 1,
		b: {
			c: 2
		}
	}
});
window.app = app;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

var _subj = __webpack_require__(6);

var _subj2 = _interopRequireDefault(_subj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ignoreProperty = ["_subj"];

var Observer = function () {
	function Observer(data) {
		_classCallCheck(this, Observer);

		this.walk(data);
	}

	_createClass(Observer, [{
		key: "walk",
		value: function walk(obj) {
			obj["_subj"] = new _subj2.default();
			for (var key in obj) {
				if (obj.hasOwnProperty(key) && ignoreProperty.indexOf(key) === -1) {
					if (_typeof(obj[key]) === "object") {
						this.walk(obj[key]);
					}
					(0, _utils.convert)(obj, key, obj[key]);
				}
			}
		}
	}]);

	return Observer;
}();

exports.default = Observer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var convert = exports.convert = function convert(obj, key, value) {
	Object.defineProperty(obj, key, {
		get: function get() {
			return value;
		},
		set: function set(newValue) {
			value = newValue;
			this._subj.publish(key, newValue);
		}
	});
};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = walkDom;

var _directive = __webpack_require__(5);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walkDom(node, data) {
	if (typeof node === "string") node = document.querySelector(node);
	if (node.hasChildNodes()) {
		node.childNodes.forEach(function (child) {
			switch (child.nodeType) {
				case 1:
					if (child.hasChildNodes()) walkDom(child, data);
					break;
				case 3:
					var attachValue = child.nodeValue.match(/{{[^\{\}]+}}/g);
					if (attachValue) {
						Array.from(new Set(attachValue)).forEach(function (expression) {
							var directive = new _directive2.default(child, expression);
							var keyPath = "data";
							var lastKey = void 0;
							expression.slice(2, -2).split(".").forEach(function (key, index, array) {
								if (index !== array.length - 1) {
									keyPath += "[\"" + key + "\"]";
								} else {
									lastKey = key;
								}
							});
							var theSubj = void 0;
							try {
								theSubj = eval(keyPath + "[\"_subj\"]");
							} catch (e) {
								console.warn("\u4E0D\u5B58\u5728" + keyPath);
							}
							if (theSubj) {
								theSubj.add(lastKey, directive);
								theSubj.publish(lastKey, eval(keyPath + "[\"" + lastKey + "\"]"));
							}
						});
					}
			}
		});
	}
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Directive;
function Directive(el, expression) {
	this.el = el;
	this.expression = expression;
}
Directive.prototype.update = function (newValue) {
	var pattern = new RegExp(this.expression, "gm");
	this.el.nodeValue = this.el.nodeValue.replace(pattern, newValue);
	this.expression = newValue;
	console.log(this.expression);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _directive = __webpack_require__(5);

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, [{
		key: "publish",
		value: function publish(key, value) {
			if (this[key] instanceof Array) {
				this[key].forEach(function (directive) {
					directive instanceof _directive2.default && directive.update(value);
				});
			}
		}
	}, {
		key: "add",
		value: function add(key, directive) {
			if (this[key] instanceof Array) {
				this[key].push(directive);
			} else {
				this[key] = [];
				this[key].push(directive);
			}
		}
	}]);

	return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);