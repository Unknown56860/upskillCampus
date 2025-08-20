const express = require('express');
require('dotenv').config()
const cors = require('cors');
const Transaction = require('./models/transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json("test ok!");
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name, price, description, dateTime} = req.body;
    const transaction = await Transaction.create({name, price, description, dateTime});
    res.json(transaction);
})

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4040);
