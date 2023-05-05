const router = require("express").Router();
const productController = require("../controller/product.controller");
const auth = require("../middleware/auth");

router.post("/", auth, productController.postNewProduct);
router.put("/", auth, productController.updateProduct);
router.delete("/", auth, productController.deleteProduct);

module.exports = router;
