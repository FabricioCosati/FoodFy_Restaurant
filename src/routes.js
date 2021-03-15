const express = require("express")
const router = express.Router()
const multer = require("./app/middlewares/multer")

const homeController = require("./app/controllers/homeController")
const recipesController = require("./app/controllers/recipesController")
const chefsController = require("./app/controllers/chefsController")
const sessionController = require("./app/controllers/sessionController")
const userController = require("./app/controllers/userController")

const userValidator = require("./app/validators/user")
const sessionValidator = require("./app/validators/session")

const sessionMiddlewares = require("./app/middlewares/session")

// Home

router.get("/", homeController.index)
router.get("/about", homeController.about)
router.get("/recipes", homeController.recipes)
router.get("/chefs", homeController.chefs)

// Chefs

router.get("/admin/chefs", sessionMiddlewares.onlyUsers, chefsController.index)
router.get("/admin/chefs/create", sessionMiddlewares.onlyUsers, sessionMiddlewares.onlyAdminUsers, chefsController.create)
router.get("/admin/chefs/:id", sessionMiddlewares.onlyUsers, chefsController.show)
router.get("/admin/chefs/:id/edit", sessionMiddlewares.onlyUsers, sessionMiddlewares.onlyAdminUsers, chefsController.edit)

router.post("/admin/chefs", multer.array("image", 1), chefsController.post)
router.put("/admin/chefs", multer.array("image", 1), chefsController.put)
router.delete("/admin/chefs", chefsController.delete)

// Recipes

router.get("/admin/recipes", sessionMiddlewares.onlyUsers, recipesController.index) // Renderiza a página principal de recipes
router.get("/admin/recipes/create", sessionMiddlewares.onlyUsers, recipesController.create) // Renderiza o formulário de create
router.get("/admin/recipes/:id", sessionMiddlewares.onlyUsers, recipesController.show) // Rendereiza a visualização
router.get("/admin/recipes/:id/edit", sessionMiddlewares.onlyUsers, sessionMiddlewares.isCreatorUser, recipesController.edit) // Renderiza o formulário de edição

router.post("/admin/recipes", multer.array("images", 5), recipesController.post) // Rota para criar nova receita
router.put("/admin/recipes", multer.array("images", 5), recipesController.put) // Rota para atualizar receita
router.delete("/admin/recipes", recipesController.delete) // Rota para deletar receita

// Session

router.get("/admin/login", sessionController.loginForm)
router.get("/admin/forgotPassword", sessionController.forgotForm)
router.get("/admin/resetPassword", sessionController.resetForm)

router.post("/admin/logout", sessionController.logout)
router.post("/admin/login", sessionController.login)
router.post("/admin/forgotPassword", sessionValidator.forgot, sessionController.forgot)
router.post("/admin/resetPassword", sessionValidator.reset, sessionController.reset)

// User

router.get("/admin/profile", sessionMiddlewares.onlyUsers, userController.index)
router.get("/admin/user/create", sessionMiddlewares.onlyUsers, sessionMiddlewares.onlyAdminUsers, userController.create)
router.get("/admin/user/list", sessionMiddlewares.onlyUsers, sessionMiddlewares.onlyAdminUsers, userController.usersList)
router.get("/admin/user/:id", sessionMiddlewares.onlyUsers, sessionMiddlewares.onlyAdminUsers, userController.showUser)

router.post("/admin/user", userValidator.post, userController.post)
router.put("/admin/user", sessionMiddlewares.onlyUsers, userValidator.update, userController.update)
router.delete("/admin/user", sessionMiddlewares.isAdminAndDiffId, userController.delete)

// Alias

router.get("/admin/user", (req, res) => {
	return res.redirect("/admin/profile")
})

module.exports = router