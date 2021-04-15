const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

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

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useUnifiedTopology: true });
          console.log('Connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
