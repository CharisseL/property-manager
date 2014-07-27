'use strict';

var Mongo = require('mongodb');
var Room = require('./room');
var Renter = require('./renter');
var _ = require('lodash');

//shortening the instance method call for
//anything that involves the database
Object.defineProperty(Apartment, 'collection', {
  get: function(){
    return global.mongodb.collection('apartments');
  }
});

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
  var count = 0;
  for(var i = 0; i < this.rooms.length; i++){
    count += this.rooms[i].isBedroom() ? 1 : 0;
  }
  //isAvailable is true if there are more bedrooms than renters
  this.isAvailable = count > this.renters.length;
  return count;
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

  if(!this.renters.length){return 0;}
  
  //calculating cost of renter using the instance method
  var rent = this.cost() / this.renters.length; 
  var collected = 0;
  
  for(var i = 0; i< this.renters.length; i++){
    //using the payRent instance method (in the renter file)
    collected += this.renters[i].payRent(rent);
    //console.log(this.renters[i].cash);
  } 
  
  return collected;
};
//return this,cost if there are renters; if not, then = 0
Apartment.prototype.revenue = function(){
  return (this.renters.length) ? this.cost(): 0;
};

//saving an apartment into the database
Apartment.prototype.save = function(cb){
  Apartment.collection.save(this, cb);
};

Apartment.find = function(query, cb){
  Apartment.collection.find(query).toArray(function(err, apts){
  for(var i = 0; i < apts.length; i++){
    apts[i]=changePrototype(apts[i]);
  }
  cb(err, apts);
  });
};

Apartment.findById = function(id, cb){
  id = (typeof id ==='string') ? Mongo.ObjectID(id) : id;
  Apartment.collection.findOne({_id:id}, function(err, apts){
    cb(err, changePrototype(apts));
    });
  };
  
Apartment.deleteById = function(id, cb){
  id = (typeof id ==='string') ? Mongo.ObjectID(id) : id;
  Apartment.collection.findAndRemove({_id:id}, cb);
};
 //
Apartment.area = function(cb){
  Apartment.find({},function(err, apts){

    var sum = 0;
    for(var i=0; i < apts.length; i++){
    sum += apts[i].area();
  }
    cb(sum);
  });
};

Apartment.cost= function(cb){
  Apartment.find({},function(err, apts){

    var sum = 0;
    for(var i=0; i < apts.length; i++){
    sum += apts[i].cost();
  }
    cb(sum);
  });
};

Apartment.revenue = function(cb){
  Apartment.find({},function(err, apts){

    var sum = 0;
    for(var i=0; i < apts.length; i++){
    sum += apts[i].revenue();
    }
    cb(sum);
  });
};

Apartment.tenants= function(cb){
  Apartment.find({},function(err, apts){

    var sum = 0;
    for(var i=0; i < apts.length; i++){
    sum += apts[i].renters.length;
    }
    cb(sum);
  });
};












module.exports = Apartment;

//changing the prototype chain for objects
//pulled out of the database
function changePrototype(apt){
  apt = _.create(Apartment.prototype, apt);
//reading through the arrays, and changing the prototypes there
  for(var i = 0; i < apt.rooms.length; i++){
    apt.rooms[i] = _.create(Room.prototype, apt.rooms[i]);
  }

  for(var j = 0; j < apt.renters.length; j++){
    apt.renters[j] = _.create(Renter.prototype, apt.renters[j]);
  }

  return apt;
}

