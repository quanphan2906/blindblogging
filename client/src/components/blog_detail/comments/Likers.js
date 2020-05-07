import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import endpoints from "../../../api_config/endpoints";
import Loader from "../../common/Loader";

function Likers({ likers }) {
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
        <div>
            {likerList.map((liker) => {
                return (
                    <div key={liker._id}>
                        <img
                            src={
                                endpoints.GET_IMAGE(liker.profileImageUrl) || ""
                            }
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
