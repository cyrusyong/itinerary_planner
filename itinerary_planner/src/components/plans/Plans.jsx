import { useEffect } from "react";

function Plans() {
    useEffect(() => {
        document.title = "Plans";
    }, []);

    return (
        <>
        Hello World
        </>
    )
}

export default Plans