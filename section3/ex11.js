const validator = require('validator');
let isEmail = validator.isEmail('hello@gmail.com');
console.log(isEmail);
isEmail = validator.isEmail('hellogmail.com');
console.log(isEmail);


let isURL = validator.isURL('https://hello.com');
console.log(isURL);