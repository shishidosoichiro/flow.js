'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var flow = require('../');

var plus1 = function(n){
	return n + 1;
};

var plus1Async = function(n){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve(n + 1);
		}, 10);
	});
};
var twiceAsync = function(n){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve(n * 2);
		}, 10);
	});
};
var reject = function(){
	return Promise.reject('rejected.')
}
var omitEven = function(n){
	if (n % 2 == 0) return n;
	return undefined;
}

describe('flow', function(){

	it('should synthesize functions.', function(){
		var plus3 = flow(plus1, plus1, plus1);
		plus3(4).should.equal(7);
	});

	it('should synthesize functions including async functions.', function(done){
		var calc = flow(
			plus1,
			twiceAsync,
			plus1,
			twiceAsync,
			plus1,
			plus1
		);
		calc(4).then(function(answer){
			answer.should.equal(24)
			done();
		});
	});

	it('should synthesize functions including rejecting functions.', function(done){
		var failToCalc = flow(
			plus1,
			twiceAsync,
			plus1,
			twiceAsync,
			reject,
			plus1
		);
		failToCalc(4).then(function(answer){
			done('error');
		})
		.catch(function(err){
			err.should.equal('rejected.');
			done();
		});
	});
	it('should cancel rest functions and return undefined, if a function return undefined.', function(done){
		var cancel = flow(
			plus1,
			plus1Async,
			omitEven,
			twiceAsync,
			plus1,
			plus1,
			plus1
		);
		cancel(4)
		.then(function(answer){
			should.equal(answer, 15);
			return cancel(5);
		})
		.then(function(answer){
			should.equal(answer, undefined);
			return cancel(6);
		})
		.then(function(answer){
			should.equal(answer, 19);
			return cancel(7);
		})
		.then(function(answer){
			should.equal(answer, undefined);
			done();
		})
	});
});