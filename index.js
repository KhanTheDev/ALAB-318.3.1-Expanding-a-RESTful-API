const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let posts = [
  { id: 1, title: 'First Post', body: 'This is the first post', userId: 1 },
  { id: 2, title: 'Second Post', body: 'This is the second post', userId: 2 }
];

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the RESTful API' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Users routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.patch('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(index, 1);
  res.status(204).send();
});

// Posts routes
app.get('/api/posts', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const filteredPosts = posts.filter(p => p.userId === parseInt(userId));
    return res.json(filteredPosts);
  }
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, body, userId } = req.body;
  const newPost = { id: posts.length + 1, title, body, userId };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.patch('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  
  const { title, body } = req.body;
  if (title) post.title = title;
  if (body) post.body = body;
  res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  
  posts.splice(index, 1);
  res.status(204).send();
});

// New user routes
app.get('/api/users/:id/posts', (req, res) => {
  const userPosts = posts.filter(p => p.userId === parseInt(req.params.id));
  res.json(userPosts);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
