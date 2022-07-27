const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/food-ordering',{useNewUrlParser:true})
            .then(()=> console.log("Database Connection Successful!"))
            .catch(err=> console.log(err));   
const db = mongoose.connection;

module.exports =db;