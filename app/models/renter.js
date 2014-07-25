'use strict';
var Apartment = require('./apartment');
var Room = require('./room');
//var request = require ('request');

function Renter(name, age, gender, job, cash){
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.job = job;
  this.cash = Math.floor(Math.random() * 4901) + 100;
  this.isEvicted = false;
}

Renter.prototype.work = function(){
  switch(this.job){
    case 'movie star':
      this.cash += (Math.floor(Math.random()*7001)+3000);
      break;
    case 'coder':
      this.cash += (Math.floor(Math.random()*6001)+1000);
      break;
    case 'waiter':
      this.cash += (Math.floor(Math.random()*201)+50);
      break;
    case 'social worker':
      this.cash += (Math.floor(Math.random()*601)+150);
  }
};

Renter.prototype.payRent = function(amount){
  //console.log(amount);
  //console.log('renter:' + JSON.stringify(this));
  if(this.isEvicted){return;}
  this.cash = this.cash - amount;

  //console.log('renter2:' + JSON.stringify(this));
  if(this.cash < 0){
    
    this.isEvicted = true;
  }
  
  //console.log('renter3:' + JSON.stringify(this));
};

Renter.prototype.party = function(){
  if(this.isEvicted){return;}
  var hype;
  hype = (Math.floor(Math.random()*11));
  if(hype >= 8){
    this.isEvicted = true;
  }
};

module.exports = Renter;
