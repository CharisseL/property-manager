'use strict';

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
      break;
  }
};

Renter.prototype.payRent = function(amount){
  this.cash = this.cash - amount;

  if(this.cash < 0){
    
    this.isEvicted = true;
  }
};


module.exports = Renter;
