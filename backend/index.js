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



const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Implement password requirements (e.g., minimum length)
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Create the user in the database
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If username and password match, return success response
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const passwordSchema = new mongoose.Schema({
  url: String,
  description: String,
  password: String
});

const Password = mongoose.model('Password', passwordSchema);

// Route to handle password storage
app.post('/password', async (req, res) => {
  const { url, description, password } = req.body;

  try {
    // Create a new password document
    const newPassword = new Password({
      url,
      description,
      password
    });

    // Save the new password document to the database
    await newPassword.save();

    // Return a success response
    return res.status(201).json({ message: 'Password stored successfully' });
  } catch (error) {
    console.error('Error storing password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/passwords', async (req, res) => {
  try {
    const passwords = await Password.find({}, 'description url password');
    res.status(200).json({ passwords });
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});