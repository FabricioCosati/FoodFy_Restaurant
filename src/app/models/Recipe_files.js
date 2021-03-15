const db = require("../config/db")

module.exports = {

	create({recipe_id, files_id}){

		try {

			const query = `
            INSERT INTO recipe_files (
                recipe_id,
                files_id
            ) VALUES ($1, $2)
            RETURNING id
            `

			const values = [
				recipe_id,
				files_id
			]

			return db.query(query, values)
            
		} catch (error) {
			console.log(error)
		}
	},

	findByRecipeId(id){

		try {

			return db.query("SELECT * FROM recipe_files WHERE recipe_id = $1", [id])
            
		} catch (error) {
			console.error(error)
		}
	}
}