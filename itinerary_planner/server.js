import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Fake user "database"
const users = [
  {
    email: 'test@gmail.com',
    password: 'test' // 🔒 In production, passwords should be hashed!
  }
];

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if(!user) {
    return res.json({ message: "User not found", success: false});
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (isMatch) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Password incorrect"});
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});