import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express'; 


const JWT_SECRET = 'surej03'; 

export const userRoutes = express.Router();

// Register User
userRoutes.post('/', async (req, res) => {
  const { username, email, usertype, password } = req.body;
  let approval = 'approved';
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (usertype === 'flight-operator') {
      approval = 'not-approved';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      usertype,
      password: hashedPassword,
      approval,
    });

    const userCreated = await newUser.save();
    return res.status(201).json(userCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Login User
userRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Approve flight operator
userRoutes.post('/approve-operator', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    user.approval = 'approved';
    await user.save();
    res.json({ message: 'Approved!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Reject flight operator
userRoutes.post('/reject-operator', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    user.approval = 'rejected';
    await user.save();
    res.json({ message: 'Rejected!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch all users
userRoutes.get('/fetch-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
});