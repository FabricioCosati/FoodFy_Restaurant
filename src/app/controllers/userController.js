const User = require("../models/User")

const mailer = require("../lib/mailer")
const {hash} = require("bcryptjs")
const crypto = require("crypto")

class userController {

	async index(req, res){

		try {

			const {userId} = req.session
			let results = await User.find({
				where: {id: userId}
			})
			const user = results.rows[0]

			return res.render("users/index", {user})
            
		} catch (error) {
			console.error(error)
		}
	}

	create(req, res){

		try {

			return res.render("users/create")
			
		} catch (error) {
			console.error(error)
		}
	}

	async post(req, res){

		try {

			const {name, email, is_admin} = req.body

			const password = await hash(Math.random().toString(12).substring(7), 8)

			const token = crypto.randomBytes(20).toString("hex")

			let expireToken = new Date()

			expireToken = expireToken.setHours(expireToken.getHours() + 1)

			let results = await User.create({
				name,
				email,
				is_admin,
				password,
				reset_token: token,
				reset_token_expires: expireToken
			})

			const userId = results.rows[0].id

			results = await User.find({
				where: {id: userId}
			})

			const user = results.rows[0]

			mailer.sendMail({
				to: user.email,
				from: "foodfy@gmail.com",
				subject: "Conta cadastrada",
				html: `
				<h2>Olá ${user.name}, sua conta foi cadastrada!</h2>
				<p>Clique no botão abaixo para cadastrar sua senha de acesso!</p>
				<a href="http://localhost:3000/admin/resetPassword?token=${token}" target="_blank">Cadastrar Senha</a> 
				`
			})

			return res.render("users/index", {
				user,
				success: "Usuário cadastrado com sucesso!"
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	async showUser(req, res){

		try {

			const {id} = req.params

			if(id == req.session.userId){
				return res.redirect("/admin/profile")
			}

			let results = await User.find({
				where: {id}
			})
			const user = results.rows[0]

			return res.render("users/index", {user})
			
		} catch (error) {
			console.error(error)
		}
	}

	async update(req, res){

		try {

			const {user} = req
			

			const {name, email, admin} = req.body
			let adm = false
			let is_admin = false

			if(user.id != req.session.userId){

				if(admin == "on"){
					is_admin = true
					adm = true
				}

				await User.update(user.id, {
					name,
					email,
					is_admin
				})
			}
			else{
				await User.update(user.id, {
					name,
					email
				})
			}

			return res.render("users/index", {
				success: "Conta atualizada com sucesso!",
				user: req.body,
				adm
			})
			
		} catch (error) {
			console.error(error)
		}
	}

	async usersList(req, res){

		try {

			let results = await User.all()
			const users = results.rows

			return res.render("users/usersList", {users})
			
		} catch (error) {
			console.error(error)
		}
	}

	async delete(req, res){
		
		try {

			const {deleteId} = req.body
			const {id} = req.body

			await User.delete(deleteId || id)

			return res.redirect("/admin/user/list")
			
		} catch (error) {
			console.error(error)
		}
	}
}

module.exports = new userController()