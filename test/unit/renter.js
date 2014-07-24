/* global describe, it, before, beforeEach */
/* jshint expr:true */
'use strict';
var expect = require('chai').expect;
var Renter = require('../../app/models/renter');

describe('Renter', function(){
  describe('constructor', function(){
    it('should create an Item object', function(){
      
      var renter= new Renter('Bob', '34', 'male', 'waiter');

      expect(renter).to.be.instanceof(Renter);
      expect(renter.name).to.equal('Bob');
      expect(renter.age).to.equal('34');
      expect(renter.gender).to.equal('male');
      expect(renter.job).to.equal('waiter');
      expect(renter.cash).to.be.within(100, 5000);
    });
  });
  
  describe('#work', function(){
    it('should add cash', function(){
      
      var renter = new Renter('Bob', '34', 'male', 'waiter');
      
      renter.work();
      
      expect(renter.cash).to.be.within(150, 5250);
    });
  });
  
  describe('#payRent', function(){
    it('should pay the rent amount', function(){
      
      var renter = new Renter('Bob', '34', 'male', 'waiter');
      
      renter.payRent(30);
      expect(renter.isEvicted).to.equal(false);

      renter.payRent(6000);
      expect(renter.isEvicted).to.equal(true);
    });
  });
});
