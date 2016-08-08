'use strict';

var slice = function(array, begin, end){
	return Array.prototype.slice.call(array, begin, end);
};
var functionalize = function(src){
	return typeof src === 'function' ? src : function(){return src};
};

var flow = function(functions){
	if (!(arguments.length === 1 && (functions instanceof Array))) functions = slice(arguments);
	functions = functions.map(functionalize);
	return function(arg){
		var that = this;
		return functions.reduce(function(arg, f){
			if (arg instanceof Promise) return arg.then(f.bind(that));
			return f.call(that, arg);
		}, arg);
	};
};

module.exports = flow;
