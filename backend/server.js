import express from 'express'
import cors from 'cors'
import placesRoutes from './routes/placesRoute.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.text())
app.use(express.json())

app.use('/places', placesRoutes)

app.listen(port, () => {
    console.log("Listening on " + port)
})