const express = require('express');
const debug = require('debug')('app:booksRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {
  /* const books = [
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
*/
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          console.log('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render('bookListView',
            {
              nav,
              title: 'Library',
              books
            });
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          console.log('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          console.log(book);
          res.render('bookView',
            {
              nav,
              title: 'Library',
              book
            });
        } catch (err) {
          console.log(err.stack);
        }
      }());
    });
  return bookRouter;
}

module.exports = router;
