const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comments = require("../models/Comments");
const router = express.Router({ mergeParams: true });

// ...api/comment
router
    .route("/")
    .get(auth, async (request, response) => {
        try {
            const { orderBy, equalTo } = request.query;
            const list = await Comments.find({ [orderBy]: equalTo });
            response.send(list);
        } catch (error) {
            response.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    })
    .post(auth, async (request, response) => {
        try {
            const newComment = await Comments.create({
                ...request.body,
                userId: request.user._id,
            });
            response.status(201).send(newComment);
        } catch (error) {
            response.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    });
router.delete("/:commentId", auth, async (request, response) => {
    try {
        const { commentId } = request.params;
        const removedComment = await Comments.findById(commentId);
        // const removedComment = await Comments.find({ _id: commentId });

        if (removedComment.userId.toString() === request.user._id) {
            await removedComment.remove();
            return response.send(null);
        } else {
            response.status(401).json({ message: "Unauthorized user" });
        }
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
