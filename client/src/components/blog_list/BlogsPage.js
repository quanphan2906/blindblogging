import React from "react";
import Slogan from "./blogs_page/Slogan";
import Search from "../common/Search";
import FilterBar from "./blogs_page/FilterBar";
import BlogList from "./BlogList";
import FeaturePost from "./blogs_page/FeaturePost";

function BlogsPage() {
    return (
        <div className="blogs-page-wrapper">
            <Slogan />
            <Search />
            <div className="blogs-page-container">
                <aside className="blogs-page-sidebar">
                    <FilterBar />
                    {/* <FeaturePost /> */}
                </aside>
                <main>
                    <h2>Posts</h2>
                    <BlogList role="guest" page="blogs" />
                </main>
            </div>
        </div>
    );
}

export default BlogsPage;
