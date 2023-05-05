const db = require("../db");

class UserController {
	async showAllProducts(req, res) {
		try {
			const products = await db.query("SELECT * FROM product");
			if (products.rows.length === 0)
				return res.status(404).send("No products available");

			res.json(products.rows);
		} catch (err) {
			console.log(err);
		}
	}

	async goToCart(req, res) {
		try {
			const user_id = req.user.user_id;
			const cart = await db.query("SELECT * FROM cart WHERE user_id = $1", [
				user_id,
			]);
			if (cart.rows.length === 0)
				return res.status(404).send("No products added to cart");

			res.json(cart.rows);
		} catch (err) {
			console.log(err);
		}
	}
	async addToCart(req, res) {
		try {
			const user_id = req.user.user_id;
			const { product_id } = req.body;
			const product = await db.query("SELECT * FROM product WHERE id = $1", [
				product_id,
			]);

			await db.query("INSERT INTO cart (products, user_id) values($1, $2)", [
				product_id,
				user_id,
			]);

			res.json(product.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}

	async removeFromCart(req, res) {
		try {
			const user_id = req.user.user_id;
			const { product_id } = req.body;
			const product = await db.query("SELECT * FROM product where id = $1", [
				product_id,
			]);
			if (product.rows.length === 0)
				return res.status(404).send("Nothing to remove");

			await db.query("DELETE FROM cart WHERE products = $1 AND user_id = $2", [
				product_id,
				user_id,
			]);

			res.json(product.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new UserController();
