import React from "react";

function Title({ title, handleChange }) {
    return (
        <div className={`${title.toLowerCase()}-wrapper`}>
            <h3> {title.charAt(0).toUpperCase() + title.slice(1)} </h3>
            <textarea
                id={title}
                className={`${title}-textarea`}
                onChange={handleChange}
            />
        </div>
    );
}

export default Title;
