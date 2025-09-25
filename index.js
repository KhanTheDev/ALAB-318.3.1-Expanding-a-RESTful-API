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

let comments = [];

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
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
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
  if (!title || !body || !userId) {
    return res.status(400).json({ error: 'Title, body, and userId are required' });
  }
  const newPost = { id: posts.length + 1, title, body, userId: parseInt(userId) };
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

// Comments routes
app.get('/comments', (req, res) => {
  const { userId, postId } = req.query;
  
  if (userId && postId) {
    const filtered = comments.filter(c => c.userId === parseInt(userId) && c.postId === parseInt(postId));
    return res.json(filtered);
  }
  if (userId) {
    const filtered = comments.filter(c => c.userId === parseInt(userId));
    return res.json(filtered);
  }
  if (postId) {
    const filtered = comments.filter(c => c.postId === parseInt(postId));
    return res.json(filtered);
  }
  
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { userId, postId, body } = req.body;
  if (!userId || !postId || !body) {
    return res.status(400).json({ error: 'userId, postId, and body are required' });
  }
  const newComment = { 
    id: comments.length + 1, 
    userId: parseInt(userId), 
    postId: parseInt(postId), 
    body 
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  res.json(comment);
});

app.patch('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
  const { body } = req.body;
  if (body) comment.body = body;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Comment not found' });
  
  comments.splice(index, 1);
  res.status(204).send();
});

// Nested routes
app.get('/posts/:id/comments', (req, res) => {
  const { userId } = req.query;
  let postComments = comments.filter(c => c.postId === parseInt(req.params.id));
  
  if (userId) {
    postComments = postComments.filter(c => c.userId === parseInt(userId));
  }
  
  res.json(postComments);
});

app.get('/users/:id/comments', (req, res) => {
  const { postId } = req.query;
  let userComments = comments.filter(c => c.userId === parseInt(req.params.id));
  
  if (postId) {
    userComments = userComments.filter(c => c.postId === parseInt(postId));
  }
  
  res.json(userComments);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/users/:id/posts');
  console.log('- GET /api/posts?userId=<value>');
  console.log('- GET/POST/PATCH/DELETE /comments');
  console.log('- GET /posts/:id/comments');
  console.log('- GET /users/:id/comments');
});
