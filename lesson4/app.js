const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
});

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// 404 Page . Always use this at the end of the code
app.use((req, res) => {
    res.status(404).sendFile('./404.html', {root: __dirname});
});