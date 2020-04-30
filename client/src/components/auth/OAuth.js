import React from "react";
import Button from "../common/Button";
import capitalize from "../../helpers/capitalize";

function OAuth({ authState }) {
    return (
        <div className="oauth-button-container">
            <Button
                action={`${capitalize(authState)} with Google`}
                color="orange"
            />
            <Button
                action={`${capitalize(authState)} with Facebook`}
                color="orange"
            />
        </div>
    );
}

export default OAuth;
