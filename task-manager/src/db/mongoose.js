const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://localhost/task-db',{useNewUrlParser:true});