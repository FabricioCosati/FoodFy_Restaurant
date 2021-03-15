const Recipe = require("../models/Recipe")
const File = require("../models/File")
const Recipe_files = require("../models/Recipe_files")
const {date} = require("../lib/utils")

async function getFileImage(req, recipe_id){
	let results = await File.findByRecipeId({ recipe_id })

	const files = results.map(file => ({
		...file.rows[0],
		src: `${req.protocol}://${req.headers.host}${file.rows[0].path.replace("public", "")}`
	}))

	return files[0]
}

module.exports = {

	async index(req, res){

		try {

			let results = await Recipe.all()
			let recipes = results.rows

			results = recipes.map(async recipe => {
				recipe.image = await getFileImage(req, recipe.id)

				return recipe
			})

			recipes = await Promise.all(results)

			return res.render("recipes/index", {recipes})
            
		} catch (error) {
			console.error(error)
		}
	},

	async create(req, res){

		try {

			let results = await Recipe.selectChefOptions()
			const options = results.rows
            
			return res.render("recipes/create", {options})

		} catch (error) {
			console.error(error)
		}
	},

	async post(req, res){

		try {

			const {userId} = req.session
			req.body.user_id = userId
			const keys = Object.keys(req.body)
            
			for(let key of keys){
				if(req.body[key] == undefined || req.body[key] == "" && key != "information"){
					return res.send("Please, fill all fields.")
				}
			}

			if(req.files.length == 0){
				return res.send("Please,send at least one image")
			}

			let results = await Recipe.create(req.body)
			const recipeId = results.rows[0].id

			results = req.files.map(file => 
				File.create({
					...file
				})    
			)

			const files = await Promise.all(results)

			results = files.map(file => 
				Recipe_files.create({
					recipe_id: recipeId,
					files_id: file.rows[0].id
				})    
			)

			await Promise.all(results)

			return res.redirect(`/admin/recipes/${recipeId}`)
            
		} catch (error) {
			console.error(error)
		}

	},

	async show(req, res) {
        
		try {

			const {id} = req.params

			let results = await Recipe.show(id)
			const recipe = results.rows[0]

			if(!recipe){
				return res.send("Recipe not found.")
			}

			results = await File.findByRecipeId({
				recipe_id: recipe.id
			})
			const files = results.map(file => ({
				...file.rows[0],
				src: `${req.protocol}://${req.headers.host}/${file.rows[0].path.replace("public", "")}`
			}))

			recipe.updated = {
				day: `${date(recipe.updated_at).day}/${date(recipe.updated_at).month}`,
				hour: `${date(recipe.updated_at).hour}:${date(recipe.updated_at).minute}`
			}

			return res.render("recipes/show", {recipe, files})
            
		} catch (error) {
			console.error(error)
		}
	},

	async edit(req, res) {
        
		try {

			const {id} = req.params

			let results = await Recipe.findById(id)
			const recipe = results.rows[0]

			if(!recipe){
				return res.send("Recipe not found.")
			}

			results = await File.findByRecipeId({ recipe_id: recipe.id })
			const files = results.map(file => ({
				...file.rows[0],
				src: `${req.protocol}://${req.headers.host}${file.rows[0].path.replace("public", "")}`
			}))

			results = await Recipe.selectChefOptions()
			const options = results.rows

			return res.render("recipes/edit", {recipe, options, files})
            
		} catch (error) {
			console.error(error)
		}
	},

	async put(req, res){
        
		try {

			const {id} = req.body

			const keys = Object.keys(req.body)

			for(let key of keys){
				if(req.body[key] == undefined || req.body[key] == "" && key != "information" && key != "imageIndex"){
					return res.send("Please, fill all fields.")
				}
			}
            
			if(req.body.imageIndex){
				const removed_files = req.body.imageIndex.split(",")
				const lastIndex = removed_files.length - 1
				removed_files.splice(lastIndex)

				let results = await Recipe_files.findByRecipeId(id)
				const recipes = results.rows

				if(recipes.length - removed_files.length == 0 && req.files.length == 0){
					return res.send("Please, send at least one image")
				}
                
				if(recipes.length + req.files.length > 5){
					return res.send("Please, send a maximum of 5 images")
				}

				removed_files.map(async file => {
					results = await File.findById({
						id: +file
					})
					const fileResult = results.rows[0]

					await File.delete(fileResult)
				})
			}

			let resultsFiles = req.files.map(file => 
				File.create({
					...file
				})
			)

			let recipesFiles = await Promise.all(resultsFiles)
            
			recipesFiles.map(file => 
				Recipe_files.create({
					recipe_id: id,
					files_id: file.rows[0].id
				})
			)

			await Promise.all(recipesFiles)

			await Recipe.update(req.body)

			return res.redirect(`/admin/recipes/${id}`)

		} catch (error) {
			console.error(error)
		}
	},

	async delete(req, res){
        
		try {

			const {id} = req.body

			await Recipe.delete(id)

			return res.redirect("/admin/recipes")
            
		} catch (error) {
			console.error(error)
		}
	}
}