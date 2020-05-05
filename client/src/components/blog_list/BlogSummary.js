import React from "react";
import placeholder from "../../assets/ipad_and_plant.jpg";
import { Link } from "react-router-dom";
import dateFormat from "../../helpers/dateFormat";

function BlogSummary({ post, role, page }) {
    const stats = {
        likes: post.likes ? parseInt(post.likes) : 0,
        comments: post.commentLength,
    };

    return (
        <div className="blog-summary-wrapper">
            <div className="cover-image">
                <img src={placeholder} alt="beatiful placeholder" />
            </div>
            <div className="content">
                <div className="date-container">
                    <div> {dateFormat(post.updatedAt)} </div>
                </div>
                <div>
                    {page === "blogs" ? (
                        <h3>{post.title}</h3>
                    ) : (
                        <h2>{post.title}</h2>
                    )}
                    <p> {post.subtitle} </p>
                    <div className="divider"></div>
                </div>
                <div className="action-container">
                    {Object.keys(stats).map((key) => {
                        return (
                            <span key={key}>
                                <span> {key} </span>
                                <span> {stats[key]} </span>
                            </span>
                        );
                    })}
                    <Link to={"/blog/" + post._id}>See post</Link>
                    {role === "author" ? (
                        <Link to={"/edit/" + post._id}>Edit post</Link>
                    ) : (
                        false
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogSummary;
