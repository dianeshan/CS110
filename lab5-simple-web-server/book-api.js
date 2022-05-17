const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// where we will keep the books
let books = [];

app.use(methodOverride('_method'))
app.use(cors());

// configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/src', express.static(path.join(__dirname + '/src')));

app.get('/book-list', (req, res) => {
    res.sendFile(__dirname + '/book-list.html');
})

app.get('/new-book', (req, res) => {
    res.sendFile(__dirname + '/new-book.html');
})

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    console.log('book is added');
    res.redirect('/book-list');
    //res.send('Book is added to the database');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;

    //remove item from the books array
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    //sending 404 when not found something is good practice
    res.status(404).send('Book not found');
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn; 
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    console.log('book is editted');
    res.redirect('/book-list');
    // res.send('Book is edited');
})

app.delete('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;

    //remove item from the books array
    books = books.filter(b => b.isbn !== isbn)

    console.log('book is deleted');
    res.redirect('/book-list');
    //res.send('Book is deleted');
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}`));
