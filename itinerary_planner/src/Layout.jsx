import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavBar />
            <main style={{height: "100%"}}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;