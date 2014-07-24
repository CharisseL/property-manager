/* global describe, it, before, beforeEach */
/* jshint expr:true */
'use strict';
var expect = require('chai').expect;
var Renter = require('../../app/models/renter');
var Room   = require('../../app/models/room');
var Apartment = require('../../app/models/apartment');

describe('Apartment', function(){
  describe('constructor', function(){
    it('should create an Apartment object', function(){
    
      var apt = new Apartment('A1');
      
      expect(apt.unitID).to.equal('A1');
      expect(apt.rooms.length).to.equal(0);
      expect(apt.renters.length).to.equal(0);
    });
  });
});
