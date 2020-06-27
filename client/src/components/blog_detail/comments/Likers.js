import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import Loader from "../../common/Loader";
import endsWith from "../../../helpers/checkEndsWith";
import Button from "../../common/Button";

const PLACEHOLDER_URL = "https://picsum.photos/200/300";
const UNDEFINED_STR = "undefined";
const BUTTON_ACTION = "Back to comment section";

function Likers({ likers, handleSeeLikers }) {
    const [likerList, setLikerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLikers = async (likers) => {
            const users = await Promise.all(
                likers.map(async (liker) => {
                    const res = await Axios.get(
                        endpoints.GET_PROFILE_ID(liker)
                    );

                    const {
                        data: { user },
                    } = res;
                    return user;
                })
            );

            setLikerList(users);
            setIsLoading(false);
        };

        fetchLikers(likers);
    }, [likers]);

    if (isLoading) return <Loader />;

    return (
        <div className="likers-container">
            <div>
                <Button
                    action={BUTTON_ACTION}
                    handleClick={() => {
                        handleSeeLikers(false);
                    }}
                    color="red"
                />
            </div>
            {likerList.map((liker) => {
                const imageUrl = endpoints.GET_IMAGE(liker.profileImageUrl);
                const isUndefinedImg = endsWith(imageUrl, UNDEFINED_STR);
                return (
                    <div key={liker._id}>
                        <img
                            src={isUndefinedImg ? PLACEHOLDER_URL : imageUrl}
                            alt={liker.altText}
                        />
                        <div>{liker.name}</div>
                        <Link to={`/profile/${liker._id}`}>
                            See this user profile
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Likers;
