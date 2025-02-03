const express=require("express")
const { getRecipes,getRecipe,addRecipe,deleteRecipe,editRecipe } = require("../controller/recipe")
const router=express.Router()


router.get("/",getRecipes) //get all recipes
router.get("/:id",getRecipe)//get recipe by id
router.post("/",addRecipe) //add recipe
router.put("/:id",editRecipe)//edit recipe
router.delete("/:id",deleteRecipe)//delete recipe

module.exports=router