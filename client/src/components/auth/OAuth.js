import React from "react";
import Button from "../common/Button";
import capitalize from "../../helpers/capitalize";

function OAuth({ authState }) {
    return (
        <div className="oauth-button-container">
            <div>
                {authState === "signup" ? (
                    <div>
                        <h2>Or signup with Google or Facebook</h2>
                    </div>
                ) : (
                    <div>
                        <h2>Or signin with Google or Facebook </h2>
                    </div>
                )}
            </div>

            <div className="button-container">
                <Button
                    action={`${capitalize(authState)} with Google`}
                    color="orange"
                />
                <Button
                    action={`${capitalize(authState)} with Facebook`}
                    color="orange"
                />
            </div>
        </div>
    );
}

export default OAuth;
