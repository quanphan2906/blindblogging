import React from "react";

function Title({ title, handleChange, content }) {
    return (
        <div className={`${title.toLowerCase()}-wrapper`}>
            <h1 id="title-heading">
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </h1>
            <textarea
                aria-label={title}
                value={content}
                id={title}
                className={`${title}-textarea`}
                onChange={handleChange}
            />
        </div>
    );
}

export default Title;
