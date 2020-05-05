import React, { useEffect } from "react";
import endpoints from "../../api_config/endpoints";
import Button from "../common/Button";
import { withRouter, Link } from "react-router-dom";

function SignedIn({ auth, handleAuthChange, history }) {
    useEffect(() => {
        history.push("/blogs");
    }, [auth]);

    const handleLogout = () => {
        localStorage.removeItem("JWT token");
        handleAuthChange(null);
    };

    return (
        <div>
            <div>
                <img
                    src={endpoints.GET_IMAGE(auth.profileImageUrl)}
                    alt={auth.altText}
                />
            </div>
            <div>
                <Link to={`/profile/${auth._id}`}> {auth.name} </Link>
            </div>
            <div className="button-container">
                <Button
                    action="Logout"
                    color="grey"
                    handleClick={handleLogout}
                />
            </div>
        </div>
    );
}

export default withRouter(SignedIn);
