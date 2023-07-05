import React, { useEffect, useState } from "react";
import Card from "./Card";
import FilterTag from "./FilterTag";

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openFilters, setOpenFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState([]);

    let activeFiltersCopy = [...activeFilters];
    const addFilterHandler = (filter) => {
        activeFiltersCopy.push(filter);
        activeFiltersCopy = [...new Set(activeFiltersCopy)];

        setActiveFilters(activeFiltersCopy);
        setOpenFilters(true);
    };
    const filterHandler = () => {
        const filteredDataCopy = data.filter((item) => {
            const itemTags = [item.level, item.role, ...item.languages];
            return activeFilters.every((filter) => {
                return itemTags.includes(filter);
            });
        });
        setFilteredData(filteredDataCopy);
    };
    const clearFilterHandler = () => {
        setActiveFilters([]);
    };

    const removeFilterHandler = (tag) => {
        activeFiltersCopy = activeFiltersCopy.filter((item) => item !== tag);
        setActiveFilters(activeFiltersCopy);
    };
    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch("data.json");
            if (!res.ok) {
                throw new Error("something went wrong.");
            }
            const data = await res.json();
            setData(data);
            setFilteredData(data);
        } catch (err) {
            setError(true);
            console.log(err);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (activeFilters.length === 0) setOpenFilters(false);
        filterHandler();
    }, [activeFilters]);
    return (
        <div className={`app-container ${openFilters && "filters-open"}`}>
            <div className="header-image">
                <img src="images/bg-header-desktop.svg" alt="header bg" className="desktop" />
                <img src="images/bg-header-mobile.svg" alt="header bg" className="mobile" />

                <div className={`card filter ${!openFilters && "hide-filters"}`}>
                    {/* Filter tags */}
                    <div className="filter-tags">
                        {activeFilters.length > 0 &&
                            activeFilters.map((tag, index) => (
                                <FilterTag tag={tag} key={index} removeFilterHandler={removeFilterHandler} />
                            ))}
                    </div>
                    <div onClick={clearFilterHandler} className="clear-filters">
                        Clear
                    </div>
                </div>
            </div>
            <div className="container">
                {filteredData.map((item) => (
                    <Card key={item.id} {...item} addFilterHandler={addFilterHandler} />
                ))}
            </div>
        </div>
    );
};

export default App;
