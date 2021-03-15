const Chef = require("../models/Chef")
const File = require("../models/File")

// Função para pegar a 1° foto de cada uma das receitas do chef
async function getRecipeImage(req, recipe_id){
	const results = await File.findByRecipeId({recipe_id})

	const files = results.map(file => ({
		...file.rows[0],
		src: `${req.protocol}://${req.headers.host}${file.rows[0].path.replace("public", "")}`
	}))

	return files[0]
}

module.exports = {

	async index(req, res){

		try {
			let results = await Chef.all()

			const chefsPromises = results.rows.map(async chef => {
				results = await File.findById({
					id: chef.file_id
				})

				const files = results.rows.map(file => ({
					...file,
					src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
				}))         

				chef.file = files[0].src
				return chef
			})

			const chefs = await Promise.all(chefsPromises)


			// Mensagem de Erro
			
			/* 	if(req.session.error){
				const msg = req.session.error
				delete req.session.error
				return res.render("chefs/index", {
					chefs,
					error: msg
				})
				
			} */

			return res.render("chefs/index", {chefs})
            
		} catch (error) {
			console.error(error)
		}
	},

	create(req, res){

		try {

			return res.render("chefs/create")
            
		} catch (error) {
			console.error(error)
		}
	},

	async post(req, res){

		try {

			const keys = Object.keys(req.body)

			for(let key of keys){
				if(req.body[key] == undefined || req.body[key] == ""){
					return res.send("Please, fill all fields.")
				}
			}

			let results = await File.create({
				filename: req.files[0].filename,
				path: req.files[0].path
			})

			req.body.file_id = results.rows[0].id

			results = await Chef.create(req.body)
			const ChefId = results.rows[0].id

			return res.redirect(`/admin/chefs/${ChefId}`)

		} catch (error) {
			console.error(error)
		}

	},

	async show(req, res) {
        
		try {

			const {id} = req.params

			// Pegar o chef pelo ID
			let results = await Chef.show(id)
			const chef = results.rows[0]

			if(!chef){
				return res.send("Chef not found.")
			}

			// Pegar foto do chef pelo file_id
			results = await File.findById({
				id: chef.file_id
			})

			let file = results.rows.map(file => ({
				...file,
				src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
			}))

			file = file[0]

			// Pega as receitas do chef pelo seu ID + foto principal de cada uma das receitas
			results = await Chef.findRecipes(id)

			let recipesPromise = results.rows.map(async recipe => {
				recipe.image = await getRecipeImage(req, recipe.id)
				return recipe
			})

			const recipes = await Promise.all(recipesPromise)

			return res.render("chefs/show", {chef, recipes, file})
            
		} catch (error) {
			console.error(error)
		}
	},

	async edit(req, res) {
        
		try {

			const {id} = req.params

			let results = await Chef.findById(id)
			const chef = results.rows[0]

			if(!chef){
				return res.send("Chef not found.")
			}

			results = await File.findById({
				id: chef.file_id
			})
            
			const filePromise = results.rows.map(file => ({
				...file,
				src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
			}))

			const file = await Promise.all(filePromise)

			return res.render("chefs/edit", {chef, file})

		} catch (error) {
			console.error(error)
		}
	},

	async put(req, res){
        
		try {
            
			const keys = Object.keys(req.body)

			for(let key of keys){
				if(req.body[key] == undefined || req.body[key] == "" && key != "removed_files" && key != "fileId"){
					return res.send("Please, fill all fields.")
				}
			}

			if(req.body.removed_files.length != 0){

				const result = await File.findById({
					id: req.body.removed_files
				})
				const file = result.rows[0]

				if(result.rows.length == 1 && req.files == 0){
					return res.send("Please, send at least one image")
				}

				await File.deleteOnlyFile(file, req.body.id)
			}

			if(req.files.length != 0){
				let results = await File.create({
					filename: req.files[0].filename,
					path: req.files[0].path,
				})

				req.body.file_id = results.rows[0].id
			}
			else {
				let results = await Chef.findById(req.body.id)
				const fileId = results.rows[0].file_id

				results = await File.findById({
					id: fileId
				})

				req.body.file_id = results.rows[0].id
			}

			await Chef.update(req.body)

			return res.redirect(`/admin/chefs/${req.body.id}`)

		} catch (error) {
			console.error(error)
		}
	},

	async delete(req, res){
        
		try {

			const {id} = req.body

			await Chef.delete(id)

			return res.redirect("/admin/chefs")
            
		} catch (error) {
			console.error(error)
		}
	}
}