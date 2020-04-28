import React from "react";
import Button from "../common/Button";

function PageNav() {
    return (
        <div className="page-nav-wrapper">
            <Button action="Previous" color="orange" width="10vw" />
            <span> 1 out of 1 pages </span>
            <Button action="Next" color="orange" width="10vw" />
        </div>
    );
}

export default PageNav;
