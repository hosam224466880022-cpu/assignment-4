const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, 'users.json');

// ===== Helper Functions =====
function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeUsers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== 1️⃣ ADD USER =====
app.post('/user', (req, res) => {
  const { id, name, age, email } = req.body;
  const users = readUsers();

  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.json({ message: 'Email already exists' });
  }

  users.push({ id, name, age, email });
  writeUsers(users);

  res.json({ message: 'User added successfully' });
});

// ===== 2️⃣ UPDATE USER =====
app.patch('/user/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.json({ message: 'User not found' });
  }

  Object.assign(user, req.body);
  writeUsers(users);

  res.json({ message: 'User updated successfully' });
});

// ===== 3️⃣ DELETE USER (FIXED) =====
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const newUsers = users.filter(u => u.id !== id);
  writeUsers(newUsers);

  res.json({ message: 'User deleted successfully' });
});

// ===== 4️⃣ GET USER BY NAME =====
app.get('/user/getByName', (req, res) => {
  const { name } = req.query;
  const users = readUsers();

  const result = users.filter(u => u.name === name);
  res.json(result);
});

// ===== 5️⃣ GET ALL USERS =====
app.get('/user', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// ===== 6️⃣ FILTER USERS BY MIN AGE =====
app.get('/user/filter', (req, res) => {
  const minAge = Number(req.query.age);
  const users = readUsers();

  const result = users.filter(u => u.age >= minAge);
  res.json(result);
});

// ===== 7️⃣ GET USER BY ID =====
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const user = users.find(u => u.id === id);
  res.json(user || { message: 'User not found' });
});

// ===== START SERVER =====
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

