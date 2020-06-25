import React from "react";

function NoMatchPage({
    message = "Sorry, we can't find what you are looking for",
}) {
    return (
        <div>
            <div> {message} </div>
        </div>
    );
}

export default NoMatchPage;
