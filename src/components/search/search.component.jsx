import React, { useState, useEffect } from "react";
import CustomInput from "../custom-input/custom-input.component";

import "./search.styles.css";

const Search = () => {
    const [countryList, setCountryList] = useState([]);
    // use only to handle the input changes
    const [country, setCountry] = useState("germany");

    // set the selected date
    const [dateRange, setDateRange] = useState(
        new Date().toISOString().split("T")[0]
    );

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

    const countryMapList = countryList.map((country, index) => {
        return (
            <option value={country} key={index}>
                {country}
            </option>
        );
    });

    const countrySearchHandler = (e) => {
        let country = e.target.value;
        setCountry(country);
    };

    const datePickerHandler = (e) => {
        setDateRange(e.target.value);
    };    

    return (
        <div className="search-container">
            <CustomInput
                type="search"
                value={country}
                list="countries"
                placeholder="Search For Topics..."
                onChange={countrySearchHandler}
            />
            <datalist id="countries">{countryMapList}</datalist>
            <CustomInput
                type="date"
                value={dateRange}
                onInput={datePickerHandler}
            />
        </div>
    );
};

export default Search;
