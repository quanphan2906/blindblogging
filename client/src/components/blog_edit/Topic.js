import React from "react";

function Topic({ handleChange, topic }) {
    return (
        <div className="topic-wrapper">
            <h1 id="topic-choice">Choose your topic</h1>
            <select
                id="topic"
                onChange={handleChange}
                aria-labelledby="topic-choice"
                value={topic}
            >
                <option value="blogging">Blogging</option>
                <option value="gardening">Gardening</option>
            </select>
        </div>
    );
}

export default Topic;
