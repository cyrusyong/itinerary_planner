const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const port = 3000

app.use(cors())
app.use(express.text())
app.use(express.json())

app.post("/get-tags", (req, res) => {
    axios.request({
        method: "GET",
        url: "https://places-api.foursquare.com/places/search?near=Tokyo,Japan",
        headers: {
            Accept: 'application/json',
            'X-Places-Api-Version': '2025-06-17',
            Authorization: 'Bearer CIZK53J2RPWDY1W0GKPJ2W5HGYY4TQJQFF1EGSPPQNMQ3SUV'
        }
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log("Listening on " + port)
})