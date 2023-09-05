const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Blog = require('../models/blog');
const { result } = require('lodash');
const { render } = require('ejs');


// express app
const app = express();

// Connect to MongoDB
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// Register view engine
app.set('view engine', 'ejs');

// Mongoose and mongoDB Sandbox

// Save a new blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'CSS Variables 2',
        snippet: 'CSS Variables are a great way to avoid redundant class names.',
        body: 'CSS variables, also known as CSS custom properties, are a way to store and reuse values in your CSS stylesheets. They provide a way to define values once and use them throughout your styles, making your code more maintainable and flexible.' 
    });

    blog.save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err)
      })
});

// Get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then((result) => {
        res.send(result)
      })
    .catch((err) => {
        console.log(err)
    })
})

// Find a single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('64f409e3dff11e1246a03899')
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
}) 

// Middleware and static files
app.use(express.static('public'))

// Middleware are functions that run on the server. They run synchronously.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.redirect('/blogs')

});

app.get('/about', (req, res) => {
    res.render('about', {title: "About"});
});

// Blogs Route

// Render the blogs on the homepage
app.get('/blogs', (req, res) => {
  // Render from newest to oldest
    Blog.find().sort( {createdAt: -1} )
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
      })

      .catch((err) => {
        console.log(err)
      })
})

// Create a new blog post from the blog form and then re-direct to the homepage once the blog is cretaed.
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    // Asynchronous save to data base 
    blog.save()
      .then((result) => {
        res.redirect('/blogs')
        // console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
})

// Dynamically assigning each blog a unique url based on id parameter
app.get('/blogs/:id', (req, res) => {
  // Extract id from req object
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch((err) => {
      console.log(err)
    })
})

// Delete Blog
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs'})
    })
    .catch((err) => {
      console.log(err)
    })
  })

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

