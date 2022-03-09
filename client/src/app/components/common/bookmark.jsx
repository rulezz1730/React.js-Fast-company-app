import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ userId, status, toggleBookmark3 }) => {
    return (
        <>
            <button
                onClick={() => toggleBookmark3(userId)}
                className={"bi bi-bookmark" + (status ? "-fill" : "")}
            ></button>
        </>
    );
};

export default Bookmark;

Bookmark.propTypes = {
    userId: PropTypes.string.isRequired,
    status: PropTypes.bool,
    toggleBookmark3: PropTypes.func.isRequired
};
