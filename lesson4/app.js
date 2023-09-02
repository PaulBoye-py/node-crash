const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// Connect to MongoDB
const dbUri = process.env.MONGODB_URI
console.log(dbUri)

// Register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// Middleware and static files
app.use(express.static('public'))

// Middleware are functions that run on the server. They run synchronously.
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        {
            title: 'CSS Variables',
            snippet: 'CSS Variables are a great way to avoid redundant class names.'
        },
        {
            title: 'AWS Global Infrastructure',
            snippet: 'AWS Global Infrastructure is all about the various data centers and edge locations for hosting cloud apps.'
        },
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
})

// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('./views/about')
})

// 404 Page . Always use this at the end of the code
app.use((req, res) => {
    res.status(404).render('404', {title: '404 - Not Found'});
});

