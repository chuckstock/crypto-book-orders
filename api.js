import express from 'express'
import exchanges from './api/exchanges'

const router = express.Router()

router.use('/exchanges', exchanges)

export default router
