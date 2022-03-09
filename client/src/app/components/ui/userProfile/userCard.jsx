import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../../store/professions";
import { getCurrentUserData } from "../../../store/users";

const UserProfile = ({ requiredUser, editUserButton, userId }) => {
    const currentUser = useSelector(getCurrentUserData());
    const userProfession = useSelector(
        getProfessionById(requiredUser.profession)
    );

    return (
        <div className="card mb-3">
            <div className="card-body UserInfoCards">
                {currentUser._id === requiredUser._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={() => editUserButton(userId)}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={requiredUser.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                        height="150"
                    />
                    <div className="mt-3">
                        <h4>{requiredUser.name}</h4>
                        <p className="text-secondary mb-1">
                            {userProfession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{requiredUser.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    requiredUser: PropTypes.object,
    editUserButton: PropTypes.func,
    userId: PropTypes.string
};

export default UserProfile;
