/* global describe, it */
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
  
  describe('#bedrooms', function(){
    it('should add up the bedrooms', function(){
      
      var room1 = new Room('bedroom', '45', '56');
      var room2 = new Room('bedroom', '35', '40');
      var room3 = new Room('bedroom', '27', '45');
      var room4 = new Room('bathroom', '15', '20');

      var apt = new Apartment('A1');
      apt.rooms.push(room1, room2, room3, room4);
      //var bedrooms = apt.bedrooms();

      expect(apt.bedrooms()).to.equal(3);
    });
  });
  
  describe('#isAvailable', function(){
    it('should see if there are availabilities', function(){
      
      var room1 = new Room('bedroom', '45', '56');
      var room2 = new Room('bedroom', '35', '40');
      var room3 = new Room('bedroom', '27', '45');
      var room4 = new Room('bathroom', '15', '20');
      var room5 = new Room('bedroom', '27', '45');

      var apt = new Apartment('A1');
      apt.rooms.push(room1, room2, room3, room4, room5);

      var bob = new Renter('Bob', '34', 'male', 'waiter');
      var sally = new Renter('Sally', '38', 'female', 'coder');
      var tommy = new Renter('Tommy', '25', 'male', 'social worker');

      apt.renters.push(bob, sally, tommy);
      
      expect(apt.bedrooms()).to.equal(4);
      expect(apt.isAvailable).to.be.true;
    });
  });
  describe('#purgeEvicted', function() {
    it('should remove evicted tenants from file', function(){

      var jim = new Renter('Jim', '54', 'male', 'social worker');
      var alice = new Renter('Alice', '71', 'female', 'movie star');
      var joe = new Renter('Joe', '27', 'male', 'waiter');
      var apt = new Apartment ('A1');

      apt.renters.push(jim, alice, joe);
      apt.renters[1].isEvicted = true;
      //console.log(apt.renters);
      expect(apt.renters[1].isEvicted).to.be.true;
      //console.log(apt.renters[1]);
      apt.purgeEvicted();
      //console.log(apt.renters);
      expect(apt.renters.length).to.equal(2);
    });
  });
  describe('#collectRent', function() {
    it('should collect the rent', function(){

      var jim = new Renter('Jim', '54', 'male', 'social worker');
      var alice = new Renter('Alice', '71', 'female', 'movie star');
      var joe = new Renter('Joe', '27', 'male', 'waiter');
      var room1 = new Room('bedroom', '45', '56');
      var room2 = new Room('bedroom', '35', '40');
      var room3 = new Room('bedroom', '27', '45');
      var room4 = new Room('bathroom', '15', '20');
      var room5 = new Room('bedroom', '27', '45');
      var apt = new Apartment ('A1');
      apt.rooms.push(room1, room2, room3, room4, room5);
      apt.renters.push(jim, alice, joe);
      apt.collectRent();
      expect(jim.cash).to.be.below(0);
      apt.purgeEvicted();
      expect(apt.renters.length).to.equal(0);
    });
  });
});
