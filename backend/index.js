require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors');
const redis = require('redis');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

async function connectRedis() {
  try {
    client = redis.createClient({
      // Add your Redis configuration here
      host: 'localhost',
      port: 6379
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log('Connected to Redis');
    return client;
  } catch (err) {
    console.error('Error connecting to Redis:', err);
    throw err; // Rethrow or handle as needed
  }
}

connectRedis();

app.use(express.json())

// get a new access token by your refresh token
app.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  // Check if token exists in Redis
  const exists = await client.exists(refreshToken)
  if (!exists) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(user)
    res.json({ accessToken: accessToken })
  })
})

app.post('/validate', async (req, res) => {
  const access_token = req.body.token
  if (access_token == null) return res.status(401)
  console.log(access_token)
  // Check if token exists in Redis

  jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403)
    }
    if (!user) return res.status(403)
    console.log("in validate", user)

    return res.status(200).json({valid: true})
  })
})

app.delete('/logout', async (req, res) => {

  // filter function will create a new array with all elements that pass the test implemented by the provided function
  const refreshToken = req.body.token
  await client.del(refreshToken)
  res.sendStatus(204)
})

app.post('/login', async (req, res) => {
  // Authenticate User

  const username = req.body.username
  console.log(req.body)
  const user = { name: username, exp: Math.floor(Date.now() / 1000) + 60*60}

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  await client.set(refreshToken, username)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.listen(4000)