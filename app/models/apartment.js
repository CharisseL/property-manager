'use strict';
var connect = require('../lib/mongodb');
var Room = require('./room');
var Renter = require('./renter');

global.mongodb.collection('apartments')
//defining Apartment constructor
function Apartment (unitID, rooms, renters){
  this.unitID = unitID;
  //rooms & renters are arrays that store rooms & renters
  this.rooms = [];
  this.renters = [];
  this.isAvailable = false;
  //console.log(this.isAvailable);
}

Apartment.prototype.area = function (){
  var total = 0;
//using for loop to calculate the area, room by room, in the array
  for(var i = 0; i < this.rooms.length; i++){
    total = total + this.rooms[i].area();
  }
  return total;
};
//using for loop to calculate the cost, room by room, in the array
Apartment.prototype.cost = function (){
  var total = 0;

  for(var i = 0; i < this.rooms.length; i++){
    total = total + this.rooms[i].cost();
  }
  return total;
};
//using for loop to calculate the number of bedrooms
Apartment.prototype.bedrooms = function(){
  var total = 0;
  for(var i = 0; i < this.rooms.length; i++){
    if(this.rooms[i].name === 'bedroom'){
      total += 1;
    }
  }
  //isAvailable is true if there are more bedrooms than renters
  this.isAvailable = total > this.renters.length;
  return total;
};

Apartment.prototype.purgeEvicted = function(){
  var notEvicted = [];
  for(var i = 0; i< this.renters.length; i++){

    //code saying ifEvicted is false, 
    //push them to the notEvicted array
    if(this.renters[i].isEvicted===false){
      notEvicted.push(this.renters[i]);
    }
  }
  //put back renters who are not evicted into the array
  this.renters = notEvicted;
};
//collectRent instance method
Apartment.prototype.collectRent = function(){
  //calculating cost of renter using the instance method
  var rent = this.cost() / this.renters.length; 
  
  for(var i = 0; i< this.renters.length; i++){
    //using the payRent instance method (in the renter file)
    this.renters[i].payRent(rent);
    //console.log(this.renters[i].cash);
  } 
};

Apartment.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
      cb();
  });
}

module.exports = Apartment;
