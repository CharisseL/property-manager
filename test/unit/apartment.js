/* global describe, it, before, beforeEach */
/* jshint expr:true */
'use strict';
var expect = require('chai').expect;
var Renter = require('../../app/models/renter');
var Room   = require('../../app/models/room');
var Apartment = require('../../app/models/apartment');
var connection = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var a1, a2;

describe('Apartment', function(){
  before(function(done){
//connecting to the mongodb
    connection('property-manager-test', function(){
      done();
    });
  });
  
  beforeEach(function(done){
    //getting rid of data changed in the test
    Apartment.collection.remove(function(){
      //declaring data to be used for all tests
          a1 = new Apartment('A1');
          var b1 = new Room('Bed', 10, 20);
          var b2 = new Room('Bed', 25, 25);
          var b3 = new Room('Bed', 30, 15);
          var k1 = new Room('Kitchen', 5, 10);
          var l1 = new Room('Living', 45, 30);
          var bob = new Renter('Bob', 22, 'Male', 'Waiter');
          var amy = new Renter('Amy', 25, 'Female', 'Movie Star');
          a1.rooms.push(b1, b2, b3, k1, l1);
          a1.renters.push(bob, amy);
          
          a2 = new Apartment('A2');
          var b4 = new Room('Bed', 30, 25);
          var b5 = new Room('Bed', 15, 45);
          var k2 = new Room('Kitchen', 25, 15);
          a2.rooms.push(b4, b5, k2);
          //saving a1 and a2 to the database
          a1.save(function(){
            a2.save(function(){
              done();
            });
          });
    });
  });

  describe('constructor', function(){
    it('should create an Apartment object', function(){
    
      expect(a1.unitID).to.equal('A1');
      expect(a1.rooms.length).to.equal(5);
      expect(a1.renters.length).to.equal(2);
    });
  });
  
  describe('#area', function(){
    it('should calculate area of all rooms', function(){

      expect(a1.rooms.length).to.equal(5);
      expect(a1.area()).to.equal(2675);
    });
  });
  
  describe('#cost', function(){
    it('should calculate cost of all rooms', function(){
      
      expect(a1.rooms.length).to.equal(5);
      expect(a1.cost()).to.equal(13375);
    });
  });
  
  describe('#bedrooms', function(){
    it('should add up the bedrooms', function(){
      //var total = a1.bedrooms();
      expect(a1.bedrooms()).to.equal(3);
    });
  });
  
  describe('#isAvailable', function(){
    it('should see if there are availabilities', function(){
      
      
      expect(a1.bedrooms()).to.equal(3);
      expect(a1.isAvailable).to.be.true;
    });
  });

  describe('#purgeEvicted', function() {
    it('should remove evicted tenants from file', function(){

      a1.renters[1].isEvicted = true;
      expect(a1.renters[1].isEvicted).to.be.true;
      a1.purgeEvicted();
      expect(a1.renters.length).to.equal(1);
    });
  });
  describe('#collectRent', function() {
    it('should collect the rent', function(){
      a1.renters[0].cash = 10000;
      a1.renters[1].cash = 300;
      var collected = a1.collectRent();
      expect(collected).to.be.closeTo(6687, 1);
      a1.purgeEvicted();
      expect(a1.renters.length).to.equal(1);
    });
  });
  
  describe('#save', function(){
    it('should save an apartment to mongodb', function(){
        expect(a1._id).to.be.instanceof(Mongo.ObjectID);
    });
  });

  describe('.find', function(){
    it('should find all of the apts in mongodb', function(done){
      Apartment.find({}, function(err, apts){
        expect(apts).to.have.length(2);
        expect(apts[0]).to.respondTo('area');
        expect(apts[0].rooms[0]).to.respondTo('area');
        expect(apts[0].renters[0]).to.respondTo('work');
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find apartment by database ID', function(done){
      Apartment.findById(a1._id, function(err, apts){
        expect(apts.unitID).to.equal('A1');
        expect(apts).to.respondTo('area');
        expect(apts.rooms[0]).to.respondTo('area');
        expect(apts.renters[0]).to.respondTo('work');
        done();
      });
    });
  });
  
  describe('.deleteById', function(){
    it('should delete apartment by database ID', function(done){
      Apartment.deleteById(a1._id, function(){
        Apartment.find({}, function(err, apts){
        expect(apts).to.have.length(1);
        done();
        });
      });
    });
  });

  describe('.area', function(){
    it('should calculate total area of apt complex', function(done){
      Apartment.area(function(area){
        expect(area).to.equal(4475);
        done();
      });
    });
  });

  describe('.cost', function(){
    it('should calculate total cost of apt complex', function(done){
      Apartment.cost(function(cost){
        expect(cost).to.equal(22375);
        done();
      });
    });
  });
  
  describe('.revenue', function(){
    it('should calculate total revenue of apt complex', function(done){
      Apartment.revenue(function(revenue){
        expect(revenue).to.equal(13375);
        done();
      });
    });
  });
  
});

  describe('.tenants', function(){
    it('should calculate total revenue of apt complex', function(done){
      Apartment.tenants(function(tenants){
        expect(tenants).to.equal(2);
        done();
      });
    });
  });
