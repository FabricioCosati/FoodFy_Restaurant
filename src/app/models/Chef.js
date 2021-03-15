const File = require("../models/File")
const Recipe = require("../models/Recipe")
const Recipe_files = require("../models/Recipe_files")

const db = require("../config/db")
const {iso} = require("../lib/utils")

module.exports = {

	all() {

		try {

			let query = `
                SELECT chefs.*, COUNT(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY total_recipes DESC
            `

			return db.query(query)
            
		} catch (error) {
			console.error(error)
		}

	},

	create(data){

		try {

			const query = `
                INSERT INTO chefs (
                    name,
                    file_id,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id
            `

			const values = [
				data.name,
				data.file_id,
				iso(Date.now())
			]

			return db.query(query, values)
            
		} catch (error) {
			console.error(error)
		}
	},

	show(id){

		try {

			const query = `
                SELECT chefs.*, count(recipes.*) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id) 
                WHERE chefs.id = $1
                group by chefs.id
            `

			return db.query(query,[id])
            
		} catch (error) {
			console.error(error)
		}
	},

	update(data){

		try {

			const query = `
                UPDATE chefs SET
                    name = $1,
                    file_id = $2
                WHERE id = $3
            `

			const values = [
				data.name, 
				data.file_id,
				data.id
			]

			return db.query(query, values)
            
		} catch (error) {
			console.error(error)
		}
	},

	findById(id){

		try {

			return db.query(" SELECT * FROM chefs WHERE id = $1",[id])
            
		} catch (error) {
			console.error(error)
		}

	},

	async delete(id){

		try {

			// Achar receitas pelo ID do chef
			let results = await Recipe.findByChefId(id)

			// Para cada receita encontrada, achar os recipe_files pelo ID de cada receita
			results.rows.map(async recipe => {
				results = await Recipe_files.findByRecipeId(recipe.id)
				
				// Para cada recipe_file encontrado, achar os files pelo file_id e deletar os files
				results.rows.map(async recipeFile => {
					results = await File.findById({
						id: recipeFile.files_id
					})
					const files = results.rows
	
					await File.delete(files[0])
				})
			})

			// Achar os chefs pelo ID
			results = await this.findById(id)
			const chef = results.rows[0]

			// Achar o file pelo ID (a foto do chef)
			results = await File.findById({
				id: chef.file_id
			})
			const file = results.rows[0]

			// Deletar o file encontrado
			await File.delete(file)

			return db.query("DELETE FROM chefs WHERE id = $1",[id])
            
		} catch (error) {
			console.error(error)
		}
	},

	findRecipes(id){

		try {

			const query = `
                SELECT recipes.*
                FROM recipes
                WHERE recipes.chef_id = $1
                ORDER BY recipes.created_at DESC
            `

			return db.query(query, [id])
            
		} catch (error) {
			console.error(error)
		}
	}
}