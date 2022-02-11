import React, { useState, useEffect } from "react";
import CustomInput from "../custom-input/custom-input.component";

import "./search.styles.css";

const Search = () => {
    const [countryList, setCountryList] = useState([]);

    // execute only one time to fetch country list
    useEffect(() => {
        fetch(`https://covid-193.p.rapidapi.com/countries`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            },
        })
            .then((response) => {
                response.json().then((data) => {
                    const countries = data.response;
                    setCountryList(countries);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="search-container">
            <CustomInput />
        </div>
    );
};

export default Search;
