'use strict';
/* jshint expr:true */
var Room = require('./room');
var Renter = require('./renter');

function Apartment (unitID, rooms, renters){
  this.unitID = unitID;
  this.rooms = [];
  this.renters = [];
  this.isAvailable = false;
  //console.log(this.isAvailable);
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

Apartment.prototype.purgeEvicted = function(){
  var notEvicted = [];
  for(var i = 0; i< this.renters.length; i++){
   // console.log(i + ' ' + this.renters);
    if(this.renters[i].isEvicted===false){
      notEvicted.push(this.renters[i]);
     // console.log(this.renters.length);
    }
  }
  this.renters = notEvicted;
};

Apartment.prototype.collectRent = function(){
  //console.log('cost ' + this.cost());
  var rent = this.cost() / this.renters.length; 
  
  for(var i = 0; i< this.renters.length; i++){
    this.renters[i].payRent(rent);
    //console.log(this.renters[i].cash);
  } 
};



module.exports = Apartment;
