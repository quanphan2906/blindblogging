import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../common/Button";

function SignedOut({ history }) {
    return (
        <div className="button-container">
            <Button
                action="Register"
                color="red"
                handleClick={() => {
                    history.push("/register");
                }}
            />
            <Button
                action="Login"
                color="grey"
                handleClick={() => {
                    history.push("/login");
                }}
            />
        </div>
    );
}

export default withRouter(SignedOut);
