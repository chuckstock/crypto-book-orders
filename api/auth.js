import express from 'express'
import * as firebase from 'firebase'

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    res.send(response)
  } catch (error) {
    res.send(error)
  }
})

export default router
