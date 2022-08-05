const { response } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Data from the database
const comments = [
    {
        id: uuidv4(),
        username: 'user1',
        comment: 'How is your weekend?'
    },
    {
        id: uuidv4(),
        username: 'user2',
        comment: 'Looking good...'
    },
    {
        id: uuidv4(),
        username: 'user3',
        comment: 'OMG!!!'
    },
    {
        id: uuidv4(),
        username: 'user4',
        comment: 'Was it the weather?'
    },
];

app.get('/', (req, res) => {
    res.send('aerare');
})

// Update - To update a comment.
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

// Create/New - Serving of new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// Create - Making a new comment
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuidv4()});
    res.redirect('/comments');
})

// Read/Show - show specific commend
app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})

// Read/Index - View all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
})

// GET Request
app.get('/typeofshawarma', (req, res) => {
    res.send("Get /typeofshawarma response");
})


// POST Request
app.post('/typeofshawarma', (req, res) => {
    const {type, qty} = req.body;
    if(qty > 1){
        res.send(`Here are your ${qty} ${type} shawarmas.`);
    }else {
        res.send(`Here is your ${qty} ${type} shawarma.`);
    }
})

app.listen(3000, () => {
    console.log("On port 3000");
})