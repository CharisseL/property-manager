'use strict';

var request = require ('request');

function Renter(name, age, gender, job, cash){
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.job = job;
  this.cash = Math.floor(Math.random() * 4901) + 100;
}


module.exports = Renter;
