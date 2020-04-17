import React from "react";
import BlogEditor from "./BlogEditor";
import Modal from "../common/Modal";
import { useState } from "react";

function BlogEditPage() {
    const [loading, setLoading] = useState(false);
    const toggleLoading = (loadingState) => {
        setLoading(loadingState);
    };
    return (
        <div>
            <BlogEditor loading={loading} toggleLoading={toggleLoading} />
            <Modal display={loading ? "block" : "none"} />
        </div>
    );
}

export default BlogEditPage;
