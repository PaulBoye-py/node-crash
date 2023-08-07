const fs = require('fs');

// A stream is like a chunk of data from a larger dataset that is readily assessible and can be used.
// Think Netflix Streaming - You are getting the vidoes not at a single go, but in bits/streams

// Read stream from a dataset or file
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf-8'});

// Write stream to a dataset or file
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('--- NEW CHUNK ---');
//     writeStream.write(`\n---NEW CHUNK---\n`);
//     writeStream.write(chunk);
// });

// Piping - an easier and faster way of reading and writing streams
readStream.pipe(writeStream);