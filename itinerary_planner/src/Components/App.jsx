import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            This is the app component
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default App