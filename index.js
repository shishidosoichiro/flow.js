'use strict';

var slice = function(array, begin, end){
	return Array.prototype.slice.call(array, begin, end);
};
var functionalize = function(src){
	return typeof src === 'function' ? src : function(){return src};
};

var flow = function(functions){
	if (arguments.length > 1 && !(functions instanceof Array)) functions = slice(arguments);
	functions = functions.map(functionalize);
	return function(arg){
		return functions.reduce(function(arg, f){
			f = f.bind(this);
			var execute = function(arg){
				if (arg === undefined) return;
				return f(arg);
			};
			if (arg instanceof Promise) return arg.then(execute);
			return execute(arg);
		}.bind(this), arg);
	};
};

module.exports = flow;
