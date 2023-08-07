// The node global object is similar to the window object of the browser. It has methods which can be used. Some common examples below.
// console.log(global);

setTimeout(() => {
    console.log('In the Timeout');
    // clearInterval(int);
}, 3000);

// const int = setInterval(() => {
//     console.log('In the interval');
// });

console.log(__dirname);
console.log(__filename);

