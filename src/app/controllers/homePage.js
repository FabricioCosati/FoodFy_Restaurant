const data = require('../../../data.json')

module.exports = {

    index(req, res){
        const recipes = data.recipes
        return res.render("home/index", {recipes})
    },

    about(req, res){
        return res.render("home/about")
    },

    recipes(req, res) {
        const recipes = data.recipes
        return res.render("home/recipes", {recipes})
    }
}