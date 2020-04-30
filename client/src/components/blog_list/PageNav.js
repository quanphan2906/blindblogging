import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../common/Button";

function PageNav({ history, location, totalPage }) {
    const getCurrentPageNum = () => {
        const query = new URLSearchParams(location.search);

        const currentPageNum = query.get("pageNum")
            ? parseInt(query.get("pageNum"))
            : 1;

        return { currentPageNum, query };
    };

    const changePage = (isPrevPage = true) => {
        const { currentPageNum, query } = getCurrentPageNum();

        let newPageNum;
        if (isPrevPage) {
            if (currentPageNum === 1) return;
            newPageNum = currentPageNum - 1;
        } else {
            if (currentPageNum === totalPage) return;
            newPageNum = currentPageNum + 1;
        }

        query.set("pageNum", newPageNum.toString());
        history.push({
            pathname: location.pathname,
            search: query.toString(),
        });
    };

    const { currentPageNum } = getCurrentPageNum();

    return (
        <div className="page-nav-wrapper">
            <Button
                action="Previous"
                color="orange"
                width="10vw"
                handleClick={() => {
                    changePage(true);
                }}
            />
            <span>
                {currentPageNum} out of {totalPage} pages
            </span>
            <Button
                action="Next"
                color="orange"
                width="10vw"
                handleClick={() => {
                    changePage(false);
                }}
            />
        </div>
    );
}

export default withRouter(PageNav);
