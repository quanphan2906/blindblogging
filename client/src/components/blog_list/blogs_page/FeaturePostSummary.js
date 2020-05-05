import React from "react";
import endpoints from "../../../api_config/endpoints";
import { Link } from "react-router-dom";

function FeaturePostSummary({ post }) {
    return (
        <div className="feature-post-container">
            <div className="image-container">
                <img src={endpoints.GET_IMAGE(post.postImageUrl)} alt="" />
            </div>
            <div className="info-container">
                <Link to={`/blog/${post._id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>By: {post.author.name} </p>
            </div>
        </div>
    );
}

export default FeaturePostSummary;
