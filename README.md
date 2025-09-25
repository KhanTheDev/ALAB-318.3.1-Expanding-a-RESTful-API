# RESTful API Expansion - ALAB 318.3.1

A simple Express.js API that manages users, posts, and comments with RESTful endpoints.

## Setup
```bash
npm install
npm run dev
```

## Routes

### Existing Routes
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post by ID
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### New Routes
- `GET /api/users/:id/posts` - Get posts by user
- `GET /api/posts?userId=<value>` - Filter posts by user
- `GET /comments` - Get all comments
- `POST /comments` - Create comment
- `GET /comments/:id` - Get comment by ID
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment
- `GET /posts/:id/comments` - Get comments on post
- `GET /users/:id/comments` - Get comments by user

### Query Parameters
- `GET /comments?userId=<value>` - Filter comments by user
- `GET /comments?postId=<value>` - Filter comments by post
- `GET /comments?userId=<value>&postId=<value>` - Filter by both

Server runs on http://localhost:3000
