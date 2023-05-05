const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

router.get("/", auth, userController.showAllProducts);
router.post("/", auth, userController.addToCart);
router.delete("/", auth, userController.removeFromCart);
router.get("/cart", auth, userController.goToCart);

module.exports = router;
