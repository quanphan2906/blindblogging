import React from "react";
import Button from "../common/Button";

function Search({ handleSearch, searchInput }) {
    return (
        <form role="search" onSubmit={handleSearch}>
            <input
                ref={searchInput}
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

export default Search;
