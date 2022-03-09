import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, onChange, value, error }) => {
    const handleChange = (e) => {
        e.preventDefault();
        const { target } = e;
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-floationg">
            <label htmlFor={name}>{label}</label>
            <textarea
                className={getInputClasses()}
                id="floationgTextarea"
                name={name}
                rows="3"
                onChange={handleChange}
                value={value}
                error={error}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaField;
