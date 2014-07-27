'use strict';
//importing elements from Room & Apartment
//var Apartment = require('./apartment');
//var Room = require('./room');

//defining the Renter constructor
function Renter(name, age, gender, job, cash){
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.job = job;
  this.cash = Math.floor(Math.random() * 4901) + 100;
  this.isEvicted = false;
}

//defining the work instance method()
Renter.prototype.work = function(){
  //switch statement because jobs need to match
  switch(this.job){
    case 'movie star':
      //randomly generating numbers for cash made @ work
      // math.floor rounds down; therefore +1
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
//defining payRent instance method()
Renter.prototype.payRent = function(amount){
  //if renter is evicted, they can't pay the rent
  if(this.isEvicted){return 0;}
  amount = parseInt(amount);
  console.log(amount);
  //if renter's cash is less than amount
  //they're evicted
  this.isEvicted = this.cash < amount;
  //if not evicted, payRent
  if(!this.isEvicted){
    this.cash = this.cash - amount;
    return amount;
  }
  return 0;
};

Renter.prototype.party = function(){
  if(this.isEvicted){return;}
  var hype;
  //random scale 1-10, how hype was the party(Loud)?
  hype = (Math.floor(Math.random()*11));
  //if is was 8 or more, they are evicted
  if(hype >= 8){
    this.isEvicted = true;
  }
};

module.exports = Renter;
