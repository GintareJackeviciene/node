const express = require('express');

const booksRouter = express.Router();

//data
let books = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      isPublished: true,
      year: 2021,
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      isPublished: false,
      year: 2022,
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      isPublished: true,
      year: 2023,
    },
    {
      id: 4,
      title: 'Book 4',
      author: 'Author 4',
      isPublished: false,
      year: 2024,
    },
    {
      id: 5,
      title: 'Book 5',
      author: 'Author 5',
      isPublished: true,
      year: 2025,
    },
  ];

// home route
booksRouter.get('/api/books', (req, res) => {
    res.json(books);
  });
  
  // gauti viena knyga
  booksRouter.get('/api/books/:bookId', (req, res) => {
    const bookId = +req.params.bookId;
    const found = books.find((bookObj) => bookObj.id === bookId);
    if (found === undefined) {
      res.status(404).json({
        msg: `book with id ${bookId} was not found`,
      });
      return;
    }
    res.json(found);
  });
  
  // istrint
  booksRouter.delete('/api/books/:bookId', (req, res) => {
    const bookId = +req.params.bookId;
    books = books.filter((bookObj) => bookObj.id !== bookId);
    res.json(books);
  });
  
  // sukurti
  booksRouter.post('/api/books', (req, res) => {
    const {title, author, isPublished, year} = req.body;
    const newBook = {
      id: +Math.random().toString().slice(3),
      title,
      author,
      isPublished,
      year,
    };
    books.push(newBook);
    res.sendStatus(201);
  });

module.exports = booksRouter;