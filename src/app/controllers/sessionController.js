const User = require("../models/User")
const {hash, compare} = require("bcryptjs")
const mailer = require("../lib/mailer")
const crypto = require("crypto")

class sessionController {

	loginForm(req, res){
        
		try {

			return res.render("session/login")
            
		} catch (error) {
			console.error(error)
		}
	}

	async login(req, res){

		try {
			
			const {email, password} = req.body

			//Verificar se os campos estão preenchidos
			const keys = Object.keys(req.body)

			for(let key of keys){
				if(req.body[key] == undefined || req.body[key] == ""){
					return res.render("session/login", {
						user: req.body,
						error: "Por favor, preencha todos os campos."
					})
				}
			}

			// Verificar se o email existe no banco de dados

			let results = await User.find({
				where: {email}
			})
			const user = results.rows[0]

			if(!user){
				return res.render("session/login", {
					user: req.body,
					error: "Usuário não cadastrado."
				})
			}

			// Verificar se a senha é igual no banco de dados

			const passed = await compare(password, user.password) || user.password == password

			if(!passed){
				return res.render("session/login", {
					user: req.body,
					error: "Senha incorreta."
				})
			}

			// Verificar se é admin?

			if(user.is_admin == true){
				req.session.isAdmin = true
			}
			else{
				req.session.isAdmin = ""
			}

			req.session.userId = user.id

			return res.redirect("/admin/profile")

		} catch (error) {
			console.error(error)
		}
	}

	logout(req, res){

		try {
			req.session.destroy()

			return res.redirect("/admin/login")
			
		} catch (error) {
			console.error(error)
		}
	}

	forgotForm(req, res){

		try {

			return res.render("session/forgotPassword")
			
		} catch (error) {
			console.error(error)
		}
	}

	async forgot(req, res){

		try {

			const {user} = req

			const token = crypto.randomBytes(20).toString("hex")

			let expiresToken = new Date()
			expiresToken = expiresToken.setHours(expiresToken.getHours() + 1)

			await User.update(user.id, {
				reset_token: token,
				reset_token_expires: expiresToken
			})

			mailer.sendMail({
				to: user.email,
				from: "foodfy@gmail.com",
				subject: "Recuperação de Senha",
				html: `
				<h2>Olá ${user.name}, perdeu a senha?</h2>
				<p>Sem problemas! Clique no link abaixo para redefinir sua senha.</p>
				<a href="http://localhost:3000/admin/resetPassword?token=${token}" target="_blank">Redefinir Senha</a> 
				`
			})
			
			return res.render("session/forgotPassword", {
				success: "Enviamos um email! Verifique sua caixa de entrada."
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	resetForm(req, res){

		try {
			return res.render("session/resetPassword", {token: req.query.token})
			
		} catch (error) {
			console.error(error)
		}
	}

	async reset(req, res){

		const {user} = req
		const {password, token} = req.body

		try {

			// Criar novo hash de senha
			const newPassword = await hash(password, 8)

			// Atualizar o usuário
			await User.update(user.id, {
				password: newPassword,
				reset_token: "",
				reset_token_expires: ""
			})

			// Redirecionar para o login

			return res.redirect("/admin/login")
			
		} catch (error) {
			console.error(error)
			return res.render("session/resetPassword", {
				user: req.body,
				error: "Algum erro ocorreu, tenten novamente.",
				token
			})
		}
	}
}

module.exports = new sessionController()