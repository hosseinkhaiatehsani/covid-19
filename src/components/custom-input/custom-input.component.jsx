import React from "react";

import "./custom-input.styles.css";

const CustomInput = ({ ...props }) => {
    return (
        <div className="custom-input">
            <input className="custom-input__search-box" {...props} />
        </div>
    );
};

export default CustomInput;
