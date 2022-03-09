const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/comments", require("./comments.routes"));
router.use("/user", require("./user.routes"));
router.use("/professions", require("./professions.routes"));
router.use("/qualities", require("./qualities.routes"));

module.exports = router;
