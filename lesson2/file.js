// Node File System Modules

const fs = require('fs');

// How to read files asynchronously (i.e node does not wait for the code to run before moving on to the next block of code, 
// however, fires the callback function when the code executes.)

// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     };
//     console.log(data.toString());
// });

// console.log('last line');

// Writing to files asynchronously
// fs.writeFile('./docs/blog1.txt', 'New write', () => {
//     console.log('File has been written');
// });

// Creating directories asynchronously
if(!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log('Folder already exists')
        }
        console.log('Directory created')
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Deleted')
    })
}

// Deleting files
if(fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('File deleted')
    })
}

