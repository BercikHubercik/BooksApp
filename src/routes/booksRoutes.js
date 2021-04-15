const express = require('express');
const debug = require('debug')('app:booksRoutes');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Hist Fiction',
      author: 'Lev Tolstoy',
      read: false
    },
    {
      title: 'Les Mieserables',
      genre: 'Hist Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'The time machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView',
        {
          nav,
          title: 'Library',
          books
        });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        });
    });
  return bookRouter;
}

module.exports = router;
