import React from "react";
import coverImg from "../../assets/anete-lusina-zwsHjakE_iI-unsplash.jpg";

function Intro() {
    return (
        <>
            <div className="cover-image-container">
                <img src={coverImg} alt="" />
            </div>
            <div className="slogan">
                <h1 className="text-align-center">Welcome to BlindBlogging</h1>
                <p className="text-align-center">
                    At blindblogging, we make blogging accessible for the
                    visually impaired. Anyone can tell stories of themselves.
                </p>
            </div>
        </>
    );
}

export default Intro;
