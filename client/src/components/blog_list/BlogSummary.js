import React from "react";
import placeholder from "../../assets/ipad_and_plant.jpg";
import { Link } from "react-router-dom";

function BlogSummary() {
    const stats = { likes: 56, comments: 10 };
    return (
        <div className="blog-summary-wrapper">
            <div className="cover-image">
                <img src={placeholder} alt="beatiful placeholder" />
            </div>
            <div className="content">
                <div>
                    <h2>How can you blog when you are visually impaired?</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ut magnam iure officia, repellat reiciendis explicabo,
                        sit suscipit dignissimos quas voluptatibus, tenetur
                        consectetur exercitationem obcaecati totam in ducimus
                        ipsam. Labore, eius!
                    </p>
                    <div className="divider"></div>
                </div>
                <div className="action-container">
                    {Object.keys(stats).map((key) => {
                        return (
                            <span>
                                <span> {key} </span>
                                <span> {stats[key]} </span>
                            </span>
                        );
                    })}
                    <Link to="/edit/asdf">Edit post</Link>
                </div>
            </div>
        </div>
    );
}

export default BlogSummary;
