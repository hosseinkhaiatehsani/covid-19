import React from "react";
import Card from "../card/card.component";

import "./search-result.styles.css";

const SearchResult = ({ data }) => {
    const { continent, country, cases, deaths, tests, population } = data;
    return (
        <section>
            <div className="country-info">
                <h2>{`${continent} / ${country}`}</h2>
                <h3>Population: {population}</h3>
            </div>
            <div className="card-container">
                <Card
                    title="cases"
                    className="gray"
                    active={cases.active}
                    critical={cases.critical}
                    total={cases.total}
                />

                <Card
                    title="deaths"
                    className="red"
                    active={deaths.new}
                    total={deaths.total}
                />

                <Card title="tests" className="orange" total={tests.total} />

                <Card
                    title="recovered"
                    className="green"
                    recovered={cases.recovered}
                />
            </div>
        </section>
    );
};

export default SearchResult;
