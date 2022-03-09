import React from "react";
import PropTypes from "prop-types";

const MeetingsCard = ({ completeMeeting }) => {
    return (
        <div className="card mb-3 MeetingsCard">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>

                <h1 className="display-1">{completeMeeting}</h1>
            </div>
        </div>
    );
};

MeetingsCard.propTypes = {
    completeMeeting: PropTypes.number
};

export default MeetingsCard;
