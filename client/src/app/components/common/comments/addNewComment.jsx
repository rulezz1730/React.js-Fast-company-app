import React, { useState, useEffect } from "react";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
// const initialData = { userId: "", content: "" };

const AddNewComment = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Комментарий обязателен для заполнения"
            }
        }
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm({});
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    onChange={handleChange}
                    value={data.content || ""}
                    error={errors.content}
                />
                <button
                    className="btn btn-primary float-end mt-3"
                    disabled={!isValid}
                >
                    Опубликовать
                </button>
            </form>
        </div>
    );
};

AddNewComment.propTypes = {
    onSubmit: PropTypes.func
};

export default AddNewComment;
