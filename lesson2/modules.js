// const pep = require('./people');

// console.log(pep.people);
// console.log(pep.ages);

// Destructuring the objects from people.js

const {people} = require('./people');

// console.log(people.pop());

const local = "Name";
people.push(local)
console.log(people);

// Node OS Module
const os = require('os');
console.log(os.platform(), os.hostname(), os.homedir());


