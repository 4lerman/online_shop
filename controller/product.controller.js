const db = require("../db");

class ProductController {
	async postNewProduct(req, res) {
		try {
			const user_id = req.user.user_id;
			const { name, price } = req.body;
			const exists = await db.query("SELECT * FROM product WHERE name = $1", [
				name,
			]);

			if (exists.rows.length > 0)
				return res.status(409).send("Product already exists");
			const newProduct = await db.query(
				"INSERT INTO product (name, price, created_by) values ($1, $2, $3) RETURNING *",
				[name, price, user_id]
			);

			res.json(newProduct.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}

	async deleteProduct(req, res) {
		try {
			const user_id = req.user.user_id;
			const { name } = req.body;
			const exists = await db.query("SELECT * FROM product WHERE name = $1 AND created_by = $2", [
				name, user_id
			]);
			if(exists.rows.length === 0) return res.status(404).send("No such product exists")

			const deletedProduct = await db.query(
				"DELETE FROM product WHERE name = $1 AND created_by = $2",
				[name, user_id]
			);

			res.json(deletedProduct.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}

	async updateProduct(req, res) {
		try {
			const user_id = req.user.user_id;
			const { product_id, name, price } = req.body;
			const exists = await db.query("SELECT * FROM product WHERE id = $1 AND created_by = $2", [
				product_id, user_id
			]);
			if(exists.rows.length === 0) return res.status(404).send("No such product exists")

			const updatedProduct = await db.query(
				"UPDATE product SET name = $1, price = $2 WHERE id = $3 AND created_by = $4 RETURNING *",
				[name, price, product_id, user_id]
			);

			res.json(updatedProduct.rows[0]);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new ProductController();
