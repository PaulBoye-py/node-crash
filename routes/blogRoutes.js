const express = require('express')
const blogController = require('../controllers/blogController')

// The express router allows us to extract the routes into a differnet file, create a mini app,
// and then use them like a middleware in the main app.js file
const router = express.Router()

// Blogs Route

// Render the blogs on the homepage
router.get('/', blogController.blog_index);
  
// Create a new blog post from the blog form and then re-direct to the homepage once the blog is cretaed.
router.post('/', blogController.blog_create_post);
  
// To get the blog form
router.get('/create', blogController.blog_create_get);
  
  
// Dynamically assigning each blog a unique url based on id parameter, and render the details of the blog
router.get('/:id', blogController.blog_details);
  
// Delete Blog
router.delete('/:id', blogController.blog_delete);
  
module.exports = router;
  