import React from "react";
import Topic from "../../blog_edit/Topic";
import { withRouter } from "react-router-dom";

function FilterBar({ location, history }) {
    const query = new URLSearchParams(location.search);

    const handleFilter = (e, key) => {
        query.set(key, e.target.value);
        query.set("pageNum", 1);

        history.push({
            pathname: location.pathname,
            search: query.toString(),
        });
    };

    return (
        <div>
            <h2>Filter Choices</h2>
            <div className="divider"></div>
            <div className="filter-container">
                <div className="select-wrapper">
                    <h3 id="is-most-recent">Most recent or most likes</h3>
                    <select
                        onChange={(e) => {
                            handleFilter(e, "isMostRecent");
                        }}
                        value={query.get("isMostRecent") || true}
                        aria-labelledby="is-most-recent"
                    >
                        <option value="true">Most recent</option>
                        <option value="false">Most like</option>
                    </select>
                </div>
                <Topic
                    handleChange={(e) => {
                        handleFilter(e, "topic");
                    }}
                    topic={query.get("topic") || "blogging"}
                    page="blogs"
                />
            </div>
        </div>
    );
}

export default withRouter(FilterBar);
