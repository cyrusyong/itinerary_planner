import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavBar />
            <main style={{height: "100%"}}> {/* Height Bug */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;