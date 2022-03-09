import React, { useEffect } from "react";
import _ from "lodash";
import AddNewComment from "../../common/comments/addNewComment";
import CommentsList from "../../common/comments/commentsList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getCommentsLoadingStatus,
    loadCommentsList,
    getComments,
    createComment,
    removeComment
} from "../../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
        // api.comments
        //     .remove(id)
        //     .then((id) => setComments(comments.filter((x) => x._id !== id)));
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddNewComment onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb=3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading"
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    thisUserId: PropTypes.string
};

export default Comments;
