'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var flow = require('../');

var plus1 = function(n){
	return n + 1;
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

});