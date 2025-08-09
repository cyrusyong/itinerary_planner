import express from 'express'
import getTags from '../controllers/placesController.js'

const router = express.Router()

router.get('/', getTags)

export default router