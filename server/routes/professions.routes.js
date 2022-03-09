const express = require("express");
const Professions = require("../models/Professions");
const router = express.Router({ mergeParams: true });

router.get("/", async (request, response) => {
    try {
        const list = await Professions.find();
        response.status(200).json(list);
    } catch (error) {
        response.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
