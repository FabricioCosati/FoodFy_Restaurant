const User = require("../models/User")

function verifyFields(body, token){
	const keys = Object.keys(body)

	for(let key of keys){
		if(body[key] == undefined || body[key] == "" && key != "id" && key != "token"){
			return {
				error: "Por favor, preencha todos os campos.",
				user: body,
				token
			}
		}
	}
}

module.exports = {

	async reset(req, res, next) {
        
		const {email, password, password_confirm, token} = req.body
        
		try {

			// Verificar se os campos estão preenchidos

			const validateFields = verifyFields(req.body, token)

			if(validateFields){
				return res.render("session/resetPassword", validateFields)
			}

			// Pegar usuário pelo email verificando se ele existe
			let results = await User.find({
				where: {email}
			})

			const user = results.rows[0]

			if(!user){
				return res.render("session/resetPassword", {
					user: req.body,
					error: "O email que você digitou não existe.",
					token
				})
			}

			// Verificar se as senhas são iguais

			if(password != password_confirm){
				return res.render("session/resetPassword", {
					user: req.body,
					error: "As senhas não são iguais",
					token
				})
			}

			// Verificar se o token é válido

			if(user.reset_token != token){
				return res.render("session/resetPassword", {
					user: req.body,
					error: "Token inválido! Por favor, solicite uma nova recuperação de senha.",
					token
				})
			}

			// Verificar se o token não expirou

			let expiresToken = new Date()
			expiresToken = expiresToken.setHours(expiresToken.getHours())

			if(expiresToken > user.reset_token_expires){
				return res.render("session/resetPassword", {
					user: req.body,
					error: "O token expirou, solicite uma nova recuperação de senha.",
					token
				})
			}

			req.user = user

			next()
            
		} catch (error) {
			console.error(error)
			return res.render("session/resetPassword", {
				user: req.body,
				error: "Erro inesperado, tente novamente.",
				token
			})
		}
	},

	async forgot(req, res, next) {

		const {email} = req.body

		try {

			// Verificar se o email existe
			let results = await User.find({
				where: {email}
			})
			const user = results.rows[0]

			if(!user){
				return res.render("session/forgotPassword", {
					user: req.body,
					error: "O email que você digitou não existe."
				})
			}

			req.user = user

			next()
			
		} catch (error) {
			console.error(error)
		}
	}
}