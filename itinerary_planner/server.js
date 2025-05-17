import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
  {
    email: 'seed',
    password: 'seed'
  }
];

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, hashed });

  res.json({ success: true, message: 'User registered successfully!' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if(!user) {
    return res.json({ success: false, message: "User not found"});
  }

  const isMatch = await bcrypt.compare(password, user.hashed);
  if (isMatch) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Password incorrect"});
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});