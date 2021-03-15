const db = require("../config/db")
const session = require("express-session")
const pgSimple = require("connect-pg-simple")(session)

module.exports = session({
	store: new pgSimple({
		pool: db
	}),
	secret: "akitongne",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 30 * 24 * 60 * 60 * 1000
	}
})