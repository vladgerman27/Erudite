const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = 8080;
const dbUri = "mongodb+srv://<User>:<password>@eruditedb.qtmggzp.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

  app.get('/books', async (req, res) => {
    const client = await MongoClient.connect(dbUri);
    const db = client.db('EruditeDB');
    const books = db.collection('BooksCollection');
  
    const data = await books.find({}).toArray();

    // console.log(data);
  
    res.json(data);
  });

  app.put('/books/:id/favorite', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const books = db.collection('BooksCollection');
      const _id = new ObjectId(req.params.id);
      const result = await books.updateOne({ _id }, { $set: { inFavorites: true } });
      if (result.modifiedCount === 0) {
        return res.status(404).send('Book not found');
      }
      const book = await books.findOne({ _id });
      client.close();
      res.send(book);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });
  
  app.put('/books/:id/unfavorite', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const books = db.collection('BooksCollection');
      const _id = new ObjectId(req.params.id);
      console.log(_id);
      const result = await books.updateOne({ _id }, { $set: { inFavorites: false } });
      if (result.modifiedCount === 0) {
        return res.status(404).send('Book not found');
      }
      const book = await books.findOne({ _id });
      client.close();
      res.send(book);
    } catch (err) {
      console.log(err);
      res.status(00).send('Server error');
    }
  });
  
  app.put('/books/:id/cart', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const books = db.collection('BooksCollection');
      const _id = new ObjectId(req.params.id);
      console.log(_id);
      const result = await books.updateOne({ _id }, { $set: { inCart: true } });
      if (result.modifiedCount === 0) {
        return res.status(404).send('Book not found');
      }
      const book = await books.findOne({ _id });
      client.close();
      res.send(book);
    } catch (err) {
      console.log(err);
      res.status(00).send('Server error');
    }
  });
  
  app.put('/books/:id/uncart', async (req, res) => {
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const books = db.collection('BooksCollection');
      const _id = new ObjectId(req.params.id);
      console.log(_id);
      const result = await books.updateOne({ _id }, { $set: { inCart: false } });
      if (result.modifiedCount === 0) {
        return res.status(404).send('Book not found');
      }
      const book = await books.findOne({ _id });
      client.close();
      res.send(book);
    } catch (err) {
      console.log(err);
      res.status(00).send('Server error');
    }
  });
  
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));