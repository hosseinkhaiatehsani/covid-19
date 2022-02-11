import React from "react";

import "./card.styles.css";

const Card = ({ className, title, ...otherProps }) => {
    const keys = Object.keys({ ...otherProps });
    const result_numbers = Object.values({ ...otherProps });
    return (
        <div className={`card ${className}`}>
            <h3 className="card__title">{title}</h3>
            {keys.map((item, index) => {
                return (
                    <div className="card-data" key={index}>
                        <strong className="card-data__label">
                            {item === "active" ? "Today" : item}:
                        </strong>{" "}
                        {result_numbers[index] !== null
                            ? result_numbers[index]
                            : "No Data"}
                    </div>
                );
            })}
        </div>
    );
};

export default Card;