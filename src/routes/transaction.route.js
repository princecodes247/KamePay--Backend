const router = require("express").Router();
const TransactionController = require("./../controllers/transaction.controller");
const auth = require("./../middlewares/auth.middleware");
const upload = require("./../middlewares/multer.middleware");
const { role } = require("./../config");

// router.post("/", auth(role.ADMIN), upload("image"), TransactionController.create);
// router.get("/", auth(role.USER), TransactionController.getAll);
// router.get("/:transactionId", auth(role.USER), TransactionController.getOne);
// router.put("/:transactionId", auth(role.USER), upload("image"), TransactionController.update);
// router.delete("/:transactionId", auth(role.USER), TransactionController.delete);

router.post("/", TransactionController.create);
router.get("/", TransactionController.getAll);
router.get("/:transactionId", TransactionController.getOne);
router.put("/:transactionId", TransactionController.update);
router.delete("/:transactionId", TransactionController.delete);

router.get("/close/:transactionId", TransactionController.closeTransaction);

module.exports = router;
