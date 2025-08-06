import NavBar from "./components/nav-bar/Navbar";
import Footer from "./components/footer/Footer";
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