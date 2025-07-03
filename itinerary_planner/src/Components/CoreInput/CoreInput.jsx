import { useState } from "react"

function CoreInput() {
    const [query, setQuery] = useState();

    const sendRequest = async () => {
        console.log("sending")
        await fetch("http://localhost:3000/get-tags", {
            method: "POST",
            body: query,
            headers: {"Content-Type": "text/plain"}
        }).then(async (res) => {

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