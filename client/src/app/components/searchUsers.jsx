import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ search, onChange, name }) => {
    return (
        <form action="" className="width-100">
            <label htmlFor=""></label>
            <input
                name={name}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={onChange}
                className="form-control"
            />
        </form>
    );
};

SearchUsers.propTypes = {
    search: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default SearchUsers;
