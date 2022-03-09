const express = require("express");
const router = express.Router({ mergeParams: true });
const Qualities = require("../models/Qualities");

router.get("/", async (request, response) => {
    try {
        const list = await Qualities.find();
        response.status(200).json(list);
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
