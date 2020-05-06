import React from "react";
import endpoints from "../../api_config/endpoints";
import HTMLParser from "react-html-parser";

function BlogDetail({
    title,
    subtitle,
    postImageUrl,
    altText,
    topic,
    content,
}) {
    return (
        <div className="blog-detail-container">
            <h1 className="title"> {title} </h1>
            <div className="subtitle"> {subtitle}</div>
            <div className="topic">Topic: {topic} </div>
            <div className="cover-image-container">
                {postImageUrl ? (
                    <img
                        src={endpoints.GET_IMAGE(postImageUrl)}
                        alt={altText ? altText : ""}
                        className="cover-image"
                    />
                ) : (
                    false
                )}
            </div>
            <div className="content"> {HTMLParser(content)} </div>
        </div>
    );
}

export default BlogDetail;
