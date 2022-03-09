const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:id", auth, async (request, response) => {
    try {
        const { id } = request.params;

        //todo: id === current user id
        if (id === request.user._id) {
            const updatedUser = await User.findByIdAndUpdate(id, request.body, {
                new: true,
            });
            response.send(updatedUser);
        } else {
            response.status(401).json({ message: "Unautorized user" });
        }
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.get("/", auth, async (request, response) => {
    try {
        const list = await User.find();
        response.status(200).send(list);
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
