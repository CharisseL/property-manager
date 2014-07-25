'use strict';

//var Room = require('./room');

function Apartment (unitID, rooms, renters){
  this.unitID = unitID;
  this.rooms = [];
  this.renters = [];
  this.isAvailable = false;
  console.log(this.isAvailable);
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

Apartment.prototype.bedrooms = function(){
  var total = 0;
  for(var i = 0; i < this.rooms.length; i++){
    if(this.rooms[i].name === 'bedroom'){
      total += 1;
    }
  }
  this.isAvailable = total > this.renters.length;
  return total;
};

module.exports = Apartment;
