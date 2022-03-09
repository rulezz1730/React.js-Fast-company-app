import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionsStatus());

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loadong...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
