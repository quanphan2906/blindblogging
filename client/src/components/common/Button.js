import React from "react";

function Button({ action, color, handleClick }) {
    return (
        <button
            className={`button-standard button-${color}`}
            onClick={handleClick}
        >
            {action}
        </button>
    );
}

export default Button;
