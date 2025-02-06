const express=require("express")
const { getRecipes,getRecipe,addRecipe,deleteRecipe,editRecipe,upload } = require("../controller/recipe")
const router=express.Router()


router.get("/",getRecipes) //get all recipes
router.get("/:id",getRecipe)//get recipe by id
router.post("/",upload.single('file'),addRecipe) //add recipe
router.put("/:id",editRecipe)//edit recipe
router.delete("/:id",deleteRecipe)//delete recipe

module.exports=router