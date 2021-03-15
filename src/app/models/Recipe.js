const File = require("../models/File")
const Recipe_files = require("../models/Recipe_files")

const db = require("../config/db")
const {iso} = require("../lib/utils")

module.exports = {

	all() {

		try {

			const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY created_at desc
            `

			return db.query(query)
            
		} catch (error) {
			console.error(error)
		}

	},

	create(data){

		try {

			const query = `
                INSERT INTO recipes (
                    title,
                    chef_id,
                    user_id,
                    ingredients,
                    preparation,
                    information,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `

			const values = [
				data.title,
				data.chef,
				data.user_id,
				data.ingredients,
				data.preparation,
				data.information,
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
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
                WHERE recipes.id = $1
                GROUP BY recipes.id, chefs.id
            `

			return db.query(query,[id])
            
		} catch (error) {
			console.error(error)
		}
	},

	update(data){

		try {

			const query = `
                UPDATE recipes SET
                    title = $1,
                    chef_id = $2,
                    ingredients = $3,
                    preparation = $4,
                    information = $5
                WHERE id = $6
            `

			const values = [
				data.title,
				data.chef,
				data.ingredients,
				data.preparation,
				data.information,
				data.id
			]

			return db.query(query, values)
            
		} catch (error) {
			console.error(error)
		}
	},

	findById(id){

		try {

			return db.query(" SELECT * FROM recipes WHERE id = $1",[id])

		} catch (error) {
			console.error(error)
		}

	},

	findByChefId(id){

		try {

			return db.query("SELECT * FROM recipes WHERE chef_id = $1",[id])

		} catch (error) {
			console.error(error)
		}

	},

	findByUserId(id){

		try {

			return db.query("SELECT * FROM recipes WHERE user_id = $1",[id])

		} catch (error) {
			console.error(error)
		}

	},

	async delete(id){

		try {

			// Achar as recipe_files pelo ID da receita
			let results = await Recipe_files.findByRecipeId(id)

			const recipeFiles = results.rows
			
			// Para cada recipe_file, achar os files pelo ID e deleta-los
			recipeFiles.map(async recipeFile => {
				results = await File.findById({
					id: recipeFile.files_id
				})
				const files = results.rows

				await File.delete(files[0])
			})

			return db.query("DELETE FROM recipes WHERE id = $1",[id])
            
		} catch (error) {
			console.error(error)
		}
	},

	selectChefOptions(){

		try {

			return db.query("SELECT name, id FROM chefs")
            
		} catch (error) {
			console.error(error)
		}

	},

	searchRecipes(params){

		try {

			const {filter, limit, offset} = params

			let query = ""
			let totalQuery = "(SELECT count(*) FROM recipes) AS total_recipes"
			let filterTotal = ""

			if(filter) {

				filterTotal = `
                WHERE recipes.title ILIKE '%${filter}%'
                `

				totalQuery = `
                (SELECT count(*) FROM recipes ${filterTotal}) AS total_recipes 
                `
			}

			query = `
            SELECT recipes.*, chefs.name AS chef_name,
            ${totalQuery}
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ${filterTotal}
            ORDER BY updated_at DESC
            LIMIT $1 OFFSET $2
            `

			return db.query(query, [limit, offset])
            
		} catch (error) {
			console.error(error)
		}
	}
}