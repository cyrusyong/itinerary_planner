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
        const placeId = result.fsq_place_id
        const categories = []
        result.categories.forEach(category => {
            categories.push(category)
        })

        allCategories.push({ "placeId": placeId, "tags": categories })
    })

    allCategories.forEach(place => {
        place.tags.forEach(entry => {
            const tag = tagMap[entry.fsq_category_id].tag

            if (categoryCount[tag]) {
                categoryCount[tag]["popularity"] += 1
                if (!categoryCount[tag]["places"].includes(place.placeId)) {
                    categoryCount[tag]["places"].push(place.placeId)
                }
            } else {
                categoryCount[tag] = { "popularity": 1, "places": [place.placeId], "tagSelected": false }
            }
        })
    })
    const sortedTags = Object.entries(categoryCount).sort(([, a], [, b]) => b.popularity - a.popularity);

    console.log(sortedTags)

    res.send(sortedTags)
}

export default getTags