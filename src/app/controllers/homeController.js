const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")
const File = require("../models/File")

module.exports = {

	async index(req, res){

		try {

			const recipesArray = []

			let results = await Recipe.all()

			const recipesPromises = results.rows.map(async recipe => {
				let results = await File.findByRecipeId({ recipe_id: recipe.id})
                
				const file = results.map(file => ({
					...file.rows[0],
					src: `${req.protocol}://${req.headers.host}${file.rows[0].path.replace("public", "")}`
				}))
                
				recipe.file = file[0].src
				return recipe
			})

			const recipes = await Promise.all(recipesPromises)

			for(let recipe of recipes){

				recipesArray.push(recipe)

				if(recipesArray.length == 6){
					break
				}

			}

			return res.render("home/index", {recipes: recipesArray})
            
		} catch (error) {
			console.error(error)
		}
        
	},

	about(req, res){
		return res.render("home/about")
	},

	async recipes(req, res) {
        
		try {

			let {page, limit, filter} = req.query

			page = page || 1
			limit = limit || 3
			const offset = limit * (page - 1)

			const params = {
				filter,
				limit,
				offset
			}

			let results = await Recipe.searchRecipes(params)

			const recipesPromises = results.rows.map(async recipe => {
				results = await File.findByRecipeId({ recipe_id: recipe.id})

				const file = results.map(file => ({
					...file.rows[0],
					src: `${req.protocol}://${req.headers.host}${file.rows[0].path.replace("public", "")}`
				}))

				recipe.file = file[0].src
				return recipe
			})

			const recipes = await Promise.all(recipesPromises)

			let total = 0

			if(recipes.length != 0){
				total = Math.ceil((+recipes[0].total_recipes) / limit)
			}

			const paginate = {
				page,
				total
			}

			return res.render("home/recipes", {recipes, filter, paginate})
            
		} catch (error) {
			console.error(error)
		}
	},

	async chefs(req, res) {

		try {
            
			let results = await Chef.all()

			const chefsPromises = results.rows.map(async chef => {
				results = await File.findById({id: chef.file_id})

				const file = results.rows.map(file => ({
					...file,
					src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
				}))

				chef.file = file[0].src

				return chef
			})
            
			const chefs = await Promise.all(chefsPromises)

			return res.render("home/chefs", {chefs})

		} catch (error) {
			console.error(error)
		}
	}
}