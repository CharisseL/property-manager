'use strict';

//var Room = require('./room');

function Apartment (unitID, rooms, renters){
  this.unitID = unitID;
  this.rooms = [];
  this.renters = [];
}

Apartment.prototype.area = function (){
  var total = 0;

  for(var i = 0; i < this.rooms.length; i++){
    total = total + this.rooms[i].area();
  }
  return total;
};

Apartment.prototype.cost = function (){
  var total = 0;

  for(var i = 0; i < this.rooms.length; i++){
    total = total + this.rooms[i].cost();
  }
  return total;
};

module.exports = Apartment;
