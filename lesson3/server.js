const http = require('http');

// Create a Server
const server = http.createServer((req, res) => {
    console.log('Server created');
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening')
})