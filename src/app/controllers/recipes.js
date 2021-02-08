const fs = require('fs')
const data = require('../../../data.json')

module.exports = {

    index(req, res){

        try {

            const recipes = data.recipes

            return res.render("recipes/index", {recipes})
            
        } catch (error) {
            console.error(error)
        }
        
    },

    create(req, res){
        return res.render("recipes/create")
    },

    post(req, res){

        try {
            
            const keys = Object.keys(req.body)

            for(key of keys){
                if(req.body[key] == undefined || req.body[key] == "" ){ 
                    return res.send("Please, fill all fields.")
                }
            }

            const {recipe_url, ingredients, preparation, details} = req.body

            let id = 1
            let lastId = data.recipes[data.recipes.length - 1].id
            console.log(lastId)

            if(lastId){
                id = lastId + 1
            }

            const recipes = {
                id: Number(id),
                recipe_url,
                ingredients,
                preparation,
                details
            }

            data.recipes.push(recipes)

            fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
                if(err) throw new Error ("Write File Error!")
                
                return res.redirect(`/admin/${id}`)
            })
            
            
        } catch (error) {
            console.error(error)
        }

    },

    show(req, res) {
        
        try {

            const {id} = req.params

            const foundRecipe = data.recipes.find(function(recipe){
                return recipe.id == id
            })

            if(!foundRecipe){
                return res.send("Recipe not found.")
            }

            const recipe = foundRecipe

            return res.render(`recipes/show`, {recipe})
            
        } catch (error) {
            console.error(error)
        }
    },

    edit(req, res) {
        
        try {

            const {id} = req.params

            const foundRecipe = data.recipes.find(function(recipe){
                return recipe.id == id
            })

            if(!foundRecipe){
                return res.send("Recipe not found.")
            }

            const recipe = foundRecipe

            return res.render(`recipes/edit`, {recipe})
            
        } catch (error) {
            console.error(error)
        }
    },

    put(req, res){
        
        try {

            const {id} = req.body
            let index = 0

            const foundRecipe = data.recipes.find(function(recipe, foundIndex){
                if(recipe.id == id){
                    index = foundIndex
                    return true
                }
            })

            if(!foundRecipe){
                return res.send("Recipe not found.")
            }

            const recipe = {
                ...foundRecipe,
                ...req.body,
                id: Number(foundRecipe.id)
            }

            data.recipes[index] = recipe

            fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
                if(err) throw new Error(err)

                return res.redirect(`/admin/${id}`)
            })
            
        } catch (error) {
            console.error(error)
        }
    },

    delete(req, res){
        
        try {
            
            const {id} = req.body

            const filteredRecipes = data.recipes.filter(function(recipe){
                if(recipe.id != id){
                    return true
                }
            })

            data.recipes = filteredRecipes

            fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
                if(err) throw new Error(err)

                return res.redirect("/admin/recipes")
            })

        } catch (error) {
            console.error(error)
        }
    }
}