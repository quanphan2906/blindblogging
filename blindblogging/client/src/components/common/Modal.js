import React from "react";

function Modal({ display }) {
    return (
        <div className="modal" display={display}>
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    );
}

export default Modal;
