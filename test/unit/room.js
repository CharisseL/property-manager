/* global describe, it */
/* jshint expr:true */
'use strict';
var expect = require('chai').expect;
var Room  = require('../../app/models/room');

describe('Room', function(){
  describe('constructor', function(){
    it('should create a Room object', function(){

      var room = new Room('living', '45', '56');

      expect(room).to.be.instanceof(Room);
      expect(room.name).to.equal('living');
      expect(room.width).to.equal(45);
      expect(room.length).to.equal(56);
    });
  });
  
  describe('constructor', function(){
    it('should create a new area object', function(){
      var room = new Room('living', '45', '56');
      
      var area = room.area();

      expect(area).to.equal(2520);
    });
  });
});
