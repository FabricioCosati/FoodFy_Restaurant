const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require("method-override")
const session = require("./app/config/session")

const server = express()
server.use(session)
server.use((req, res, next) => {

	res.locals.session = req.session

	next()
})

server.set("view engine", "njk")

server.use(express.urlencoded({extended: true}))
server.use(express.static("public"))
server.use(methodOverride("_method"))
server.use(routes)

nunjucks.configure("src/app/views", {
	express: server,
	autoescape: false,
	noCache: true
})

server.listen(5000, function(){
	console.log("Server is Listening")
})

