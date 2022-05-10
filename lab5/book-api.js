const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// where we will keep the books
let books = [
    {
            "isbn":"9781593279509",
            "title":"Eloquent JavaScript, Third Edition",
            "subtitle":"A Modern Introduction to Programming",
            "author":"Marijn Haverbeke",
            "published":"2018-12-04T00:00:00.000Z",
            "publisher":"No Starch Press",
            "pages":472,
            "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website":"http://eloquentjavascript.net/"
        },
        {
            "isbn":"9781491943533",
            "title":"Practical Modern JavaScript",
            "subtitle":"Dive into ES6 and the Future of JavaScript",
            "author":"Nicolás Bevacqua",
            "published":"2017-07-16T00:00:00.000Z",
            "publisher":"O'Reilly Media",
            "pages":334,
            "description":"To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
            "website":"https://github.com/mjavascript/practical-modern-javascript"
        },
];

app.use(cors());

// configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    console.log(books);
    //res.redirect("book-list.html");
    window.location.replace('book-list.html');
    res.send('Book is added to the database');
    
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

    res.send('Book is edited');
})

app.delete('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;

    //remove item from the books array
    books = books.filter(b => {
        if (b.isbn !== isbn) {
            return true;
        }
        else {
            return false;
        }
    })

    res.send('Book is deleted');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}`));
