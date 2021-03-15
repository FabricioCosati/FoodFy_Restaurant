const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

const db = require("../config/db")

module.exports = {

	all(){

		try {

			return db.query("SELECT * FROM users")
			
		} catch (error) {
			console.error(error)
		}
	},

	async create(filters){

		try {

			let query = "INSERT INTO users ("

			Object.keys(filters).map((key, index, array) => {

				if(index + 1 < array.length){
					query += ` ${key},`
				}
				else{
					query += ` ${key})`
				}
			})

			query += "VALUES ("
			let values = []
			
			Object.keys(filters).map((key, index, array) => {
				
				if(index + 1 < array.length){
					query += `$${index+1},`
				}
				else{
					query += `$${index+1})`
				}

				values.push(filters[key])
			})

			query += " RETURNING id"

			return db.query(query, values)
			
		} catch (error) {
			console.error(error)
		}
	},

	find(filters){

		let query = "SELECT * FROM users"

		Object.keys(filters).map(key => {
			query += ` ${key}`

			Object.keys(filters[key]).map(field => {
				query += ` ${field} = '${filters[key][field]}'`
			})
		})

		return db.query(query)
	},

	async update(id, filters){

		try {

			let query = "UPDATE users SET"

			Object.keys(filters).map((key, index, array) => {
				if(index + 1 < array.length){
					query += ` ${key} = '${filters[key]}',`
				}
				else{
					query += ` ${key} = '${filters[key]}' WHERE id = ${id}`
				}
			})

			await db.query(query)
			return 

		} catch (error) {
			console.error(error)
		}
	},

	async delete(id){

		try {

			let results = await Recipe.findByUserId(id)

			results.rows.map(async recipe => {
				await Chef.delete(recipe.chef_id)
			})

			return db.query("DELETE FROM users WHERE id = $1", [id])
			
		} catch (error) {
			console.error(error)
		}
	}
}