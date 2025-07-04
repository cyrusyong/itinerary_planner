import axios from 'axios'
import tagMap from '../categories_group_mapped.json' with { type: 'json' }
import 'dotenv/config'

const getTags = async (req, res) => {
    const { location } = req.query
    const allCategories = []
    const categoryCount = {}

    const response = await axios.request({
        method: 'GET',
        url: `https://places-api.foursquare.com/places/search?near=${location}&limit=50`,
        headers: {
            'X-Places-Api-Version': '2025-06-17',
            Authorization: `Bearer ${process.env.FOURSQUARE_KEY}`
        }
    })

    const results = response.data.results
    results.forEach(result => {
        result.categories.forEach(category => {
            allCategories.push(category)
        })
    })
    
    allCategories.forEach(category => {
        const tag = tagMap[category.fsq_category_id].tag

        console.log(tagMap[category.fsq_category_id].label + " mapping to " + tag)

        if (categoryCount[tag]) {
            categoryCount[tag] += 1
        } else {
            categoryCount[tag] = 1
        }
    })

    const sortedTags = Object.fromEntries(Object.entries(categoryCount).sort(([, a], [, b]) => b - a))

    res.send(sortedTags)
}

export default getTags