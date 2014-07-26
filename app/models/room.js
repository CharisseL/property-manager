'use strict';
var Renter = require('./renter');
var Apartment = require('./apartment');

function Room (name, width, length){
  this.name = name;
  this.width = parseInt(width);
  this.length = parseInt(length);
}

Room.prototype.area = function(){
  return this.width * this.length;
};

Room.prototype.cost = function(){
  //calling area instance method to use in our cost formula
  return this.area() * 5;
};

module.exports = Room;
