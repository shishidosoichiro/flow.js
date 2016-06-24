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

describe('flow', function(){

	it('should synthesize functions.', function(){
		var plus3 = flow(plus1, plus1, plus1);
		plus3(4).should.equal(7);
	});

	it('should synthesize functions including async functions.', function(done){
		var plus1TwicePlus1 = flow(
			plus1,
			twiceAsync,
			plus1,
			twiceAsync,
			plus1,
			plus1
		);
		plus1TwicePlus1(4).then(function(answer){
			answer.should.equal(24)
			done();
		});
	});
});