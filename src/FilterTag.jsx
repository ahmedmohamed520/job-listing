import React from "react";

const FilterTag = ({ tag, removeFilterHandler }) => {
    return (
        <div className="filter-tag">
            <div className="filter-text">{tag}</div>
            <div
                onClick={() => {
                    removeFilterHandler(tag);
                }}
                className="filter-icon"
            >
                <img src="images/icon-remove.svg" alt="close" />
            </div>
        </div>
    );
};

export default FilterTag;
