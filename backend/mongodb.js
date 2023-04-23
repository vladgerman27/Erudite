const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

const port = 8080;
const dbUri = "mongodb+srv://Vlad:26417108@eruditedb.qtmggzp.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

  app.get('/books', async (req, res) => {
    const client = await MongoClient.connect(dbUri);
    const db = client.db('EruditeDB');
    const books = db.collection('BooksCollection');
  
    const data = await books.find({}).toArray();
  
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

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');

      const user = await users.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = user.password === password;

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ _id: user._id, email: user.email }, "vlad");

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/register', async (req, res) => {
    const {email, password, name } = req.body;

    const client = await MongoClient.connect(dbUri);
    const db = client.db('EruditeDB');
    const users = db.collection('UsersCollection');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
        return res.status(401).json({ error: 'User already exists' });
    }

    const result = await users.insertOne({ email, password, name });

    const token = jwt.sign({ _id: result.insertedId, email }, "vlad");

    res.json({ token });
});
  
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));