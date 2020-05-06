import React, { useState, useEffect } from "react";
import Button from "./Button";
import { withRouter } from "react-router-dom";

function Search({ location, history }) {
    const [searchValue, setSearchValue] = useState("");

    const query = new URLSearchParams(location.search);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const searchQuery = query.get("search");
        if (searchQuery) setSearchValue(searchQuery);
    }, [location.search]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchValue === "") {
            if (query.has("search")) query.delete("search");
        } else {
            query.set("search", searchValue);
            query.set("pageNum", 1);
            if (query.get("isMostRecent")) query.delete("isMostRecent");
        }

        history.push({
            pathname: location.pathname,
            search: query.toString(),
        });
    };

    return (
        <form role="search" onSubmit={handleSearch}>
            <input
                value={searchValue}
                onChange={handleChange}
                type="search"
                placeholder="Search articles by title..."
            />
            <Button
                action="Search"
                color="red"
                fontSize="16px"
                fontWeight={600}
            />
        </form>
    );
}

export default withRouter(Search);
