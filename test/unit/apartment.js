/* global describe, it */
/* jshint expr:true */
'use strict';
var expect = require('chai').expect;
//var Renter = require('../../app/models/renter');
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
  
  describe('#area', function(){
    it('should calculate area of all rooms', function(){
      var room1 = new Room('living', '45', '56');
      var room2 = new Room('bedroom', '35', '40');
      var room3 = new Room('kitchen', '27', '45');

      var apt = new Apartment('A1');
      apt.rooms.push(room1, room2, room3);

      var area = apt.area();
      
      expect(apt.rooms.length).to.equal(3);
      expect(area).to.equal(5135);
    });
  });
  
  describe('#cost', function(){
    it('should calculate cost of all rooms', function(){
      var room1 = new Room('living', '45', '56');
      var room2 = new Room('bedroom', '35', '40');
      var room3 = new Room('kitchen', '27', '45');

      var apt = new Apartment('A1');
      apt.rooms.push(room1, room2, room3);

      var cost = apt.cost();
      
      expect(apt.rooms.length).to.equal(3);
      expect(cost).to.equal(25675);
    });
  });
});

