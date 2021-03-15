const {Pool} = require("pg")

module.exports = new Pool({
	user: "postgres",
	password: "1802",
	database: "foodfy",
	host: "localhost",
	port: "5432",
})