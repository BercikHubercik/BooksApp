const express = require('express');
const debug = require('debug')('app:booksRoutes');
const sql = require('mssql');

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
      const request = new sql.Request();
      (async function query() {
        const { recordset } = await request.query('select * from books');
        console.log(recordset);
        res.render('bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          });
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        [req.book] = recordset; // table dictracture
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView',
        {
          nav,
          title: 'Library',
          book: req.book
        });
    });
  return bookRouter;
}

module.exports = router;
