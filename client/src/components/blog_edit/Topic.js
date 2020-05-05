import React from "react";

function Topic({ handleChange, topic, page }) {
    return (
        <div className="topic-wrapper">
            {page === "blogs" ? (
                <h3 id="topic-choice" className="topic-choice">
                    Choose your topic
                </h3>
            ) : (
                <h1 id="topic-choice" className="topic-choice">
                    Choose your topic
                </h1>
            )}
            <select
                id="topic"
                onChange={handleChange}
                aria-labelledby="topic-choice"
                value={topic}
            >
                <option value="blogging">Blogging</option>
                <option value="gardening">Gardening</option>
                <option value="romantic story">Romantic story</option>
            </select>
        </div>
    );
}

export default Topic;
