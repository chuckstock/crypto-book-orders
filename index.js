import express from 'express'
import cookieSession from 'cookie-session'
import passport from 'passport'
import bodyParser from 'body-parser'
import firebase from 'firebase'
import keys from './config/keys'
import apiRoutes from './api'

const app = express()

firebase.initializeApp(keys.firebase)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', apiRoutes)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'))

  // Express will serve index.html if it doesn't recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
