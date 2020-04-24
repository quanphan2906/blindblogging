import React from "react";

function Topic({ handleChange }) {
    return (
        <div className="topic-wrapper">
            <h3>Choose your topic</h3>
            <select id="topic" onChange={handleChange}>
                <option value="blogging">Blogging</option>
                <option value="gardening">Gardening</option>
            </select>
        </div>
    );
}

export default Topic;
