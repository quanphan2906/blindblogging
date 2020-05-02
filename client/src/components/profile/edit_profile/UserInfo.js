import React from "react";
import capitalize from "../../../helpers/capitalize";

function UserInfo({ title, infoList, handleInfoChange }) {
    return (
        <div className={`${title}-container grid-col`}>
            <h1> {capitalize(title)} </h1>
            <textarea
                aria-label={`${title}-textarea`}
                id={title}
                value={infoList[title] || ""}
                onChange={handleInfoChange}
            />
        </div>
    );
}

export default UserInfo;
