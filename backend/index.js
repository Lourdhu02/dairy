const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/expenseTrackerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema for transactions
const transactionSchema = new mongoose.Schema({
  income: Number,
  date: Date,
  description: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Route to handle adding new transactions
app.post('/transactions', (req, res) => {
  const { income, date, description } = req.body;

  // Create a new transaction document
  const newTransaction = new Transaction({
    income,
    date,
    description
  });


  // Save the transaction to the database
  newTransaction.save()
  .then(savedTransaction => {
    console.log('Transaction saved successfully:', savedTransaction);
    res.status(200).send('Transaction saved successfully');
  })
  .catch(error => {
    console.error('Error saving transaction:', error);
    res.status(500).send('Error saving transaction');
  });
});


app.get('/transactions',async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);

})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
