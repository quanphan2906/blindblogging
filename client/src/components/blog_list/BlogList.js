import React from "react";
import BlogSummary from "./BlogSummary";
import PageNav from "./PageNav";

function BlogList() {
    return (
        <div className="blog-list-wrapper">
            <div className="blog-list-container">
                <BlogSummary />
                <BlogSummary />
                <BlogSummary />
            </div>
            <PageNav />
        </div>
    );
}

export default BlogList;
