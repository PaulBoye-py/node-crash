const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// Create a Server
const server = http.createServer((req, res) => {
   
    // Lodash random method
    const num = _.random(0, 23);
    console.log(num);

    // Lodash once method
    const greet = _.once(() => {
        console.log('Hello Lodash');
    });

    greet();
    greet();
    // Set Header content type
    res.setHeader('content-type', 'text/html');

    // Basic Routing
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // How to redirect 
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Read html file and send it to the client/browser
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            res.end(data);
        }
    })
});



server.listen(3000, 'localhost', () => {
    console.log('Server is listening')
})