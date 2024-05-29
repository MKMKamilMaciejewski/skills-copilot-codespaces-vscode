// Create web server and listen on port 3000
// This file is responsible for handling all the incoming requests and responses
// This file is the entry point of the project

// Import the express module
const express = require('express');

// Import the path module
const path = require('path');

// Import the body-parser module
const bodyParser = require('body-parser');

// Import the mongoose module
const mongoose = require('mongoose');

// Import the comment model
const Comment = require('./models/comment');

// Create an instance of express
const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/comments');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Get all the comments
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                comments: comments
            });
        }
    });
});

// Save a comment
app.post('/comment/save', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    });

    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
