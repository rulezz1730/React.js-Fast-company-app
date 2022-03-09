import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useParams } from "react-router-dom";
import { getQualities, getQualitiesStatus } from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUserData } from "../../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const qualities = useSelector(getQualities());
    const isQualitiesLoading = useSelector(getQualitiesStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professions = useSelector(getProfessions());
    const isProfessionLoading = useSelector(getProfessionsStatus());
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const [errors, setErrors] = useState({});

    const { userId } = useParams();

    if (currentUser._id !== userId) {
        history.push(`/users/${currentUser._id}/edit`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(
            updateUserData({
                ...user,
                qualities: user.qualities.map((q) => q.value)
            })
        );
    }

    function getQualitiesById(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        const result = getQualitiesById(data).map((q) => ({
            label: q.name,
            value: q._id
        }));
        return result;
    };

    useEffect(() => {
        if (
            !isProfessionLoading &&
            !isQualitiesLoading &&
            currentUser &&
            !user
        ) {
            setUser({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [isProfessionLoading, isQualitiesLoading, currentUser, user]);

    useEffect(() => {
        if (user && isLoading) {
            setLoading(false);
        }
    }, [user]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        profession: {
            isRequired: {
                message: "Необходимо обязательно выбрать профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [user]);

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const isValid = Object.keys(errors).length === 0;

    const pressBack = () => {
        history.goBack();
    };
    // const transformUserQualitiesForRender = (qualData, user) => {
    //     const qualitiesData = [];
    //     const { qualities } = user;
    //     for (const q of qualData) {
    //         for (const qual of qualities) {
    //             if (qual === q._id) {
    //                 qualitiesData.push({ label: q.name, value: q._id });
    //             }
    //         }
    //     }
    //     setUser({ ...user, qualities: qualitiesData });
    // };

    // useEffect(() => {
    //     transformUserQualitiesForRender(qualities, currentUser);
    // }, [currentUser, qualities]);

    // const transformUserQualitiesForLoad = (userQualities) => {
    //     const newQualities = userQualities.map((q) => q.value);
    //     return newQualities;
    // };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => pressBack()}>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Choose profession"
                                name="profession"
                                options={professionsList}
                                onChange={handleChange}
                                value={user.profession}
                                error={errors.profession}
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите Ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={user.qualities}
                                options={qualitiesList}
                                name="qualities"
                                onChange={handleChange}
                                label="Выберите Ваши качества"
                            />
                            <button
                                disabled={!isValid}
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
