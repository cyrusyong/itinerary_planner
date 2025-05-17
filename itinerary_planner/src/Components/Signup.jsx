import { Link } from "react-router-dom"

function Signup() {
    return (
        <div>
            This is the signup component
            <Link to={"/"}>
                <button>Go back to Home</button>
            </Link>
        </div>
    )
}

export default Signup