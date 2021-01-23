const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();

/// ---- MIDDLEWARES -----
// express.json parses incoming requests with JSON
// app.use() to use express middleware
app.use(express.json())

app.use(cors())

const database = {
    users: [
      {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        tries: 10,
        joined: new Date()
      },
      {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        tries: 10,
        joined: new Date()
      }
    ],
    login: [
      {
        id: '987',
        hash: '',
        email: 'john@gmail.com'
      }
    ]
  }

app.get('/', (req, res) => {
    res.json('Hello');
})

// /signup
app.post('/signup', (req, res) => {
    const { email, name, password } = req.body
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          console.log(hash)
      });
    });
    database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      tries: 10,
      joined: new Date()
    })

    res.json(database.users[database.users.length - 1])
})

// /login
app.post('/login', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logging in')
  }
})

// /profile/:id --- get
app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id == id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(404).json("No such user")
  }
})

// /#numOfTries -- PUT
app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id == id) {
      found = true
      user.tries--
      return res.json(user.tries)
    }
  })
  if (!found) {
    res.status(404).json("No such user")
  }
})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})