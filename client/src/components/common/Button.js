import React from "react";

function Button({
    action,
    color,
    fontSize = "20px",
    fontWeight = "400",
    width = "auto",
    handleClick,
}) {
    return (
        <button
            className={`button-standard button-${color}`}
            style={{ fontSize, fontWeight, width }}
            onClick={handleClick}
        >
            {action}
        </button>
    );
}

export default Button;
