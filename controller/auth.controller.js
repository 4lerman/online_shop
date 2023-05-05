const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class authController {
	async login(req, res) {
		try {
			const { email, password } = req.body;
			if (!(email && password)) res.status(400).send("All input is required");
			const user = await db.query("SELECT * FROM person WHERE email = $1", [
				email,
			]);
			if (user.rows.length === 0)
				return res.status(401).send("Email is incorrect");
			// PASSWORD CHECK
			const validPassword = await bcrypt.compare(
				password,
				user.rows[0].password
			);
			if (!validPassword) return res.status(401).send("Incorrect password");

			const token = jwt.sign(
				{ user_id: user.rows[0].id, email },
				process.env.TOKEN_SECRET,
				{ expiresIn: "4min" }
			);

			await db.query("UPDATE person SET token=$1 WHERE email=$2 RETURNING *", [
				token,
				email,
			]);

			res.json(token);
		} catch (err) {
			console.log(err);
		}
	}

	async register(req, res) {
		try {
			const { email, password } = req.body;
			const users = await db.query("SELECT * FROM person where email = $1", [
				email,
			]);
			if (users.rows.length > 0)
				return res.json("User already exists. Log in!");

			const encPassword = await bcrypt.hash(password, 10);
			const newUser = await db.query(
				"INSERT INTO person (email, password) values ($1, $2) RETURNING *",
				[email.toLowerCase(), encPassword]
			);

			res.json(newUser.rows[0]);
		} catch (err) {
			res.send(err);
		}
	}
}

module.exports = new authController();
