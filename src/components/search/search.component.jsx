import React, { useState, useEffect } from "react";
import CustomInput from "../custom-input/custom-input.component";
import SearchResult from "../search-result/search-result.component";

import "./search.styles.css";

const Search = () => {
    const [countryList, setCountryList] = useState([]);
    // use only to handle the input changes
    const [country, setCountry] = useState("germany");

    // set the selected date
    const [dateRange, setDateRange] = useState(
        new Date().toISOString().split("T")[0]
    );

    // if value of input find in list then this state will set to input value
    const [selectedCountry, setSelectedCountry] = useState(country);
    const [result, setResult] = useState(null);    

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

    // fetch data for selected country and selected dataRange
    useEffect(() => {
        // create a parameter to use in fetch
        const params = new URLSearchParams({
            country: selectedCountry,
            day: dateRange,
        });

        fetch(`https://covid-193.p.rapidapi.com/history?${params}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            },
        })
            .then((response) => {
                response.json().then((data) => {
                    setResult(data.response[0]);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedCountry, dateRange]);

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

        // prevnet rendering with every character input
        if (countryList.indexOf(country) !== -1) {
            setSelectedCountry(country);
        }
    };

    const datePickerHandler = (e) => {
        setDateRange(e.target.value);
    };

    return (
        <div className="search-container">
            <div className="search-container__inputs">
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
            { result ? <SearchResult data={result} /> : "waiting"}
        </div>
    );
};

export default Search;
