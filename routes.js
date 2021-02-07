const express = require('express')
const router = express.Router()

const data = require('./data.js')

router.get("/", function(req, res){
    return res.render("home/index", {recipes: data})
})

router.get("/about", function(req, res){
    return res.render("home/about")
})

router.get("/recipes", function(req, res) {
    return res.render("home/recipes", {recipes: data})
})

module.exports = router