import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

function Navbar() {
    const pages = [{ name: "HOME", url: "/blogs" }];

    const { auth, handleAuthChange } = useContext(AuthContext);

    return (
        <nav className="navbar-wrapper">
            <div>
                <h1>BLIND BLOGGING</h1>
            </div>
            <div className="pages-wrapper">
                {pages.map((page) => (
                    <div key={page.url}>
                        <Link to={page.url}>{page.name}</Link>
                    </div>
                ))}
            </div>
            {auth ? (
                <SignedIn auth={auth} handleAuthChange={handleAuthChange} />
            ) : (
                <SignedOut />
            )}
        </nav>
    );
}

export default Navbar;
