import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ numberOfPeople, users }) => {
    return (
        <h1>
            <span
                className={`badge m-2 bg-${
                    users.length > 0 ? "primary" : "danger"
                }`}
            >
                {numberOfPeople}
            </span>
        </h1>
    );
};

SearchStatus.propTypes = {
    numberOfPeople: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
};

export default SearchStatus;
