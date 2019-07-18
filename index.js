'use strict';

const mongoose = require('mongoose');

const Categories = require('./data-modeling/models-modular/categories/categories.js');
// Require your model

// Mongoose Server URI
const MONGOOSE_URI = 'mongodb://localhost:27017/class05';

// Connect
mongoose.connect(MONGOOSE_URI);
let food = new Categories();
food.create({name:'Chicken', description:'Meat'}).then(foodItem => 
  console.log(foodItem).catch(console.error));
// Do some work

// Disconnect
mongoose.disconnect();