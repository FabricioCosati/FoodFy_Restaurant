const express = require('express')
const router = express.Router()
const homepage = require('./app/controllers/Homepage')
const recipes = require('./app/controllers/recipes')

router.get("/", homepage.index)
router.get("/about", homepage.about)
router.get("/recipes", homepage.recipes)

router.get("/admin/recipes", recipes.index) // Renderiza a página principal de recipes
router.get("/admin/create", recipes.create) // Renderiza o formulário de create
router.get("/admin/:id", recipes.show) // Rendereiza a visualização
router.get("/admin/recipes/:id/edit", recipes.edit) // Renderiza o formulário de edição

router.post("/admin/recipes", recipes.post) // Rota para criar nova receita
router.put("/admin/recipes", recipes.put) // Rota para atualizar receita
router.delete("/admin/recipes", recipes.delete) // Rota para deletar receita

module.exports = router