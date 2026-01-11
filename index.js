const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

/**
 * Fake Database (In-memory)
 */
let users = [
  { id: 1, name: "John", email: "john@test.com" },
  { id: 2, name: "Jane", email: "jane@test.com" }
];

/**
 * GET - Get all users
 */
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

/**
 * GET - Get single user by ID
 */
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/**
 * POST - Create new user
 */
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

/**
 * PUT - Update user
 */
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name ?? users[userIndex].name,
    email: email ?? users[userIndex].email
  };

  res.status(200).json(users[userIndex]);
});

/**
 * DELETE - Remove user
 */
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted",
    user: deletedUser[0]
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
