import React, { useContext, useRef } from "react";
import Author from "../blog_detail/Author";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../common/Button";
import BlogList from "../blog_list/BlogList";

function Profile() {
    const auth = useContext(AuthContext);

    const searchInput = useRef();

    const handleSearch = (e) => {
        e.preventDefault();

        console.log(searchInput.current.value);
    };
    return (
        <div className="profile-page-wrapper">
            <Author author={auth} />
            <main className="profile-page-container">
                <h1>Your past posts</h1>
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
                {/* add select form here when add draft functionality */}
                <BlogList />
            </main>
        </div>
    );
}

export default Profile;
