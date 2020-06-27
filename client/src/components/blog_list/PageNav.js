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
    const pagination = `${currentPageNum} out of ${totalPage} pages`;

    return (
        <div className="page-nav-wrapper">
            <div className="page-nav-container">
                <div>
                    <Button
                        action="Previous"
                        color="orange"
                        width="10vw"
                        handleClick={() => {
                            changePage(true);
                        }}
                    />
                </div>
                <div className="page-info">{pagination}</div>
                <div>
                    <Button
                        action="Next"
                        color="orange"
                        width="10vw"
                        handleClick={() => {
                            changePage(false);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default withRouter(PageNav);
