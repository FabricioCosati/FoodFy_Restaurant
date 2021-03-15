const Recipe = require("../models/Recipe")

module.exports = {

	onlyUsers(req, res, next){

		try {

			if(!req.session.userId){
				return res.redirect("/admin/login")
			}
            
			next()

		} catch (error) {
			console.error(error)
		}
	},

	onlyAdminUsers(req, res, next){

		try {

			if(!req.session.isAdmin){
				// Mensagem de Erro
				
				/* req.session.error = "Você não tem permissão para acessar esta página." */

				if(req.url.includes("user")){
					return res.redirect("/admin/profile")
				}

				let routeUrl = req.url.replace(/\/[^//]+$/g, "")
				return res.redirect(`${routeUrl}`)
			}

			next()
            
		} catch (error) {
			console.error(error)
		}
	},

	async isCreatorUser(req, res, next){

		try {

			let results = await Recipe.findById(req.params.id)
			const recipe = results.rows[0]
            
			if(recipe.user_id != req.session.userId && !req.session.isAdmin){
				let routeUrl = req.url.replace(/\/[^//]+$/g, "")
				return res.redirect(`${routeUrl}`)
			}
			
			next()
            
		} catch (error) {
			console.error(error)
		}
	},

	isAdminAndDiffId(req, res, next){

		try {

			const {deleteId} = req.body
			
			if(!req.session.isAdmin || deleteId == req.session.userId){
				return res.redirect("/admin/profile")
			}

			next()
			
		} catch (error) {
			console.error(error)
		}
	}
}