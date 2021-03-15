const User = require("../models/User")
const {compare} = require("bcryptjs")

function verifyFields(body){
	const keys = Object.keys(body)

	for(let key of keys){
		if(body[key] == undefined || body[key] == "" && key != "id"){
			return {
				error: "Por favor, preencha todos os campos.",
				user: body
			}
		}
	}
}

module.exports = {

	async update(req, res, next){

		try {

			// Pegar o usuário pelo ID
			let results = await User.find({
				where: {id: req.body.id}
			})

			const user = results.rows[0]

			if(!user){
				return res.render("users/index", {
					user: req.body,
					error: "Algum erro ocorreu."
				})
			}

			let {email, password} = req.body

			// Verificar se os campos estão preenchidos
			const validateFields = verifyFields(req.body)

			if(validateFields){
				return res.render("users/index", validateFields)
			}

			if(req.body.password){
				// Verificar se o usuário preencheu a senha
				if(!password){
					return res.render("users/index", {
						user: req.body,
						error: "Por favor, preencha a senha para atualizar seu perfil."
					})
				}

				// Verificar se a senha é igual ao banco de dados
				const passed = await compare(password, user.password)

				if(!passed){
					return res.render("users/index", {
						user: req.body,
						error: "Senha incorreta."
					})
				}
			}

			// Ao mudar o email, verificar se o novo email não existe no banco
			results = await User.find({
				where: {email}
			})

			const findUser = results.rows[0]

			if(findUser && user.email != email){
				return res.render("users/index", {
					error: "O email que você digitou já está cadastrado.",
					user: req.body
				})
			}

			req.user = user

			next()
            
		} catch (error) {
			console.log(error)
			return res.render("users/index", {
				error: "Algum erro aconteceu.",
				user: req.body
			})
		}
	},

	async post(req, res, next){

		try {

			let {email, admin} = req.body
			

			// Verificar se os campos estão preenchidos

			const validateFields = verifyFields(req.body)

			if(validateFields){
				return res.render("users/create", validateFields)
			}

			// Verificar se o email ja existe no banco de dados

			let results = await User.find({
				where: {email}
			})

			const findUser = results.rows[0]

			if(findUser){
				return res.render("users/create", {
					error: "O email que você digitou já está cadastrado.",
					user: req.body
				})
			}

			// Verificar se é admin

			req.body.is_admin = false

			if(admin){
				req.body.is_admin = true
			}

			next()
			
		} catch (error) {
			console.error(error)
		}
	}
}