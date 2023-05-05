const Pool = require('pg').Pool
const pool = new Pool({
    user: "4lerman",
	password: "root",
	host: "localhost",
	port: 5432,
	database: "online_shop",
})

module.exports = pool