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

  app.post('/login', async (req, res) => {
    const { email, password} = req.body;

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
      
      const token = jwt.sign({ _id: user._id, email: user.email, name: user.name, cart: user.cart, favorites: user.favorites }, "token");

      res.json({ token, name: user.name });
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

    const result = await users.insertOne({ email, password, name, cart: [], favorites: [] });

    const token = jwt.sign({ _id: result.insertedId, email, cart: [] }, "token");

    res.json({ token });
  });

  function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
    return res.status(401).json({ error: 'Необходимо авторизоваться' });
    }
    
    try {
    const decodedToken = jwt.verify(token, 'token');
    req.userId = decodedToken._id;
    next();
    } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Неверный токен' });
    }
  }

  app.post('/cart', verifyToken, async (req, res) => {
    const bookId = req.body.bookId;
    const bookImg = req.body.bookImg;
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const bookAvailable = req.body.bookAvailable;
    const bookCost = req.body.bookCost;
    const userId = req.userId;
    
    try {
    const client = await MongoClient.connect(dbUri);
    const db = client.db('EruditeDB');
    const users = db.collection('UsersCollection');
    await users.updateOne({ _id: new ObjectId(userId) }, { $push: { cart: {bookId, bookImg, bookTitle, bookAuthor, bookAvailable, bookCost} }});
    
    res.json({ message: 'Книга успешно добавлена в корзину' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/cart', verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      const user = await users.findOne({ _id: new ObjectId(userId) });
      
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
      } else {
        res.json(user.cart);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/cart/delete', verifyToken, async (req, res) => {
    const userId = req.userId;
    const bookId = req.body.bookId;
  
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { cart: { bookId } } }
      );
  
      res.json({ message: 'Книга успешно удалена из корзины' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/cart', verifyToken, async (req, res) => {
    const userId = req.userId;
    const cart = req.body.cart;
  
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { cart } }
      );
  
      res.json({ message: 'Корзина успешно обновлена' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/favorites', verifyToken, async (req, res) => {
    const bookId = req.body.bookId;
    const bookImg = req.body.bookImg;
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const bookCost = req.body.bookCost;
    const userId = req.userId;
    
    try {
    const client = await MongoClient.connect(dbUri);
    const db = client.db('EruditeDB');
    const users = db.collection('UsersCollection');
    await users.updateOne({ _id: new ObjectId(userId) }, { $push: { favorites: {bookId, bookImg, bookTitle, bookAuthor, bookCost} }});
    
    res.json({ message: 'Книга успешно добавлена в корзину' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/favorites', verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      const user = await users.findOne({ _id: new ObjectId(userId) });
      
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
      } else {
        res.json(user.favorites);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/favorites/delete', verifyToken, async (req, res) => {
    const userId = req.userId;
    const bookId = req.body.bookId;
  
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { favorites: { bookId } } }
      );
  
      res.json({ message: 'Книга успешно удалена из корзины' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/favorites/delete', verifyToken, async (req, res) => {
    const userId = req.userId;
  
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { favorites: [] } }
      );
  
      if (result.modifiedCount === 0) {
        res.status(404).json({ message: 'Пользователь не найден' });
      } else {
        res.json({ message: 'Корзина пользователя успешно очищена' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/isFavorite/:bookId', verifyToken, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.userId;
  
    try {
      const client = await MongoClient.connect(dbUri);
      const db = client.db('EruditeDB');
      const users = db.collection('UsersCollection');
      const user = await users.findOne({ _id: new ObjectId(userId), favorites: { $elemMatch: { bookId } } });
      if (user) {
        res.json({ isFavorite: true });
      } else {
        res.json({ isFavorite: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));