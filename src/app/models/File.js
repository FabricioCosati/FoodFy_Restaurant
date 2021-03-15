const db = require("../config/db")
const fs = require("fs")

module.exports = {

	create({filename, path}){

		try {

			const query = `INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
            `

			const values = [
				filename,
				path
			]

			return db.query(query, values)
            
		} catch (error) {
			console.error(error)
		}
	},

	findById({id}){

		try {
			return db.query(" SELECT * FROM files WHERE id = $1", [id])
            
		} catch (error) {
			console.error(error)
		}
	},

	async findByRecipeId({recipe_id}){

		try {

			let results = await db.query("SELECT files_id FROM recipe_files WHERE recipe_id = $1", [recipe_id])
			const getFileId = results.rows

			results = getFileId.map(async fileId => {
				return await db.query("SELECT * FROM files WHERE files.id = $1", [fileId.files_id])
			})
            
			return await Promise.all(results)
            
		} catch (error) {
			console.error(error)
		}
	},

	async delete(file){

		try {

			const {id, path} = file

			await db.query("DELETE FROM recipe_files WHERE files_id = $1", [id])
            
			fs.unlinkSync(path)
            
			return db.query("DELETE FROM files WHERE id = $1", [id])
            
		} catch (error) {
			console.error(error)
		}

	},

	async deleteOnlyFile(file, chefId){

		try {

			const {id, path} = file

			await db.query("UPDATE chefs SET file_id = null WHERE id = $1", [chefId])

			fs.unlinkSync(path)
            
			return db.query("DELETE FROM files WHERE id = $1", [id])
            
		} catch (error) {
			console.error(error)
		}
	}
}