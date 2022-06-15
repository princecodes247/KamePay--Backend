const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/transactions", require("./transaction.route"));

module.exports = router;
