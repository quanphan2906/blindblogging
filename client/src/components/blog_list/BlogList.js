import React from "react";
import BlogSummary from "./BlogSummary";
import PageNav from "./PageNav";
import NoMatchPage from "../common/NoMatchPage";

function BlogList({ postList, totalPage }) {
    if (postList.length === 0) return <NoMatchPage />;
    return (
        <div className="blog-list-wrapper">
            <div className="blog-list-container">
                {postList.map((post) => (
                    <BlogSummary post={post} key={post._id} />
                ))}
            </div>
            <PageNav totalPage={totalPage} />
        </div>
    );
}

export default BlogList;
