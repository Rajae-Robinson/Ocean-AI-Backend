const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

/// ---- Controllers -----
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const user = require('./controllers/user')

/// ---- MIDDLEWARES -----
// express.json parses incoming requests with JSON
// app.use() to use express middleware
const app = express();
app.use(express.json())
app.use(cors())

/// ---- Routes -----
app.get('/', (req, res) => { res.json('Server connected') })
// /signup
app.post('/signup', (req, res) => {signup.handleSignup(req, res, knex, bcrypt) })
// /login
app.post('/login', (req, res) => {login.handleLogin(req, res, knex, bcrypt) })
// /user/:id --- GET
app.get('/user/:id', (req, res) => {user.getUser(req, res, knex) })
// /user/:id --- PUT (update number of tries)
app.put('/user/:id', (req, res) => {user.updateTries(req, res, knex) })


app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})