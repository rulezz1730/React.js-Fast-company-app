/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ qualities }) => {
    return qualities.map((qual) => (
        <span className={`badge m-2 bg-${qual.color}`} key={qual._id}>
            {qual.name}
        </span>
    ));
};

export default Qualitie;

Qualitie.propTypes = {
    qualities: PropTypes.array.isRequired
};
