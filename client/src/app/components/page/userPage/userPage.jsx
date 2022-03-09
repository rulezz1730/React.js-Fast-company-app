import React from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import UserProfile from "../../ui/userProfile/userCard";
import Comments from "../../ui/userProfile/comments";
import QualitiesCard from "../../ui/userProfile/qualitiesCard";
import MeetingsCard from "../../ui/userProfile/meetingsCard";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const user = useSelector(getUserById(userId));

    const editUser = () => {
        history.push(`${history.location.pathname}edit/`);
    };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3 ">
                        <UserProfile
                            requiredUser={user}
                            editUserButton={editUser}
                            userId={userId}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completeMeeting={user.completedMeetings}
                        />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
