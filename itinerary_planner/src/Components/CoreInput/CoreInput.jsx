import { useState } from "react"

function CoreInput() {
    const [query, setQuery] = useState();

    const sendRequest = async () => {
        console.log("sending")
        const response = await fetch(`http://localhost:3000/places?location=${query}`, {
            method: "GET",
            headers: {"Content-Type": "text/plain"}
        })

        const tags = await response.json()

        Object.keys(tags).forEach(key => {
            console.log(key + " Popularity: " + tags[key])
        })
    }

    return (
        <div>
            Where are we headed to?
            <form onSubmit={(e) => {
                e.preventDefault()
                sendRequest()
            }}>
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
            </form>
        </div>
    )
}

export default CoreInput;