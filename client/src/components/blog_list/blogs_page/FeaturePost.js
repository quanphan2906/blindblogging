import React, { useState, useEffect } from "react";
import FeaturePostSummary from "./FeaturePostSummary";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import errorHandler from "../../../api_config/errorHandler";
import Loader from "../../common/Loader";

function FeaturePost() {
    const [postList, setPostList] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get(endpoints.GET_POSTS(), {
                    params: { isMostRecent: false, resPerPage: 4 },
                });

                const {
                    data: { posts },
                } = res;

                setPostList(posts);
                setIsLoading(false);
            } catch (err) {
                errorHandler(err);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="feature-post-wrapper">
            <h2>Feature posts</h2>
            <div className="divider"></div>
            <div className="feature-post-list">
                {postList.map((post) => (
                    <FeaturePostSummary post={post} key={post._id} />
                ))}
            </div>
        </div>
    );
}

export default FeaturePost;
