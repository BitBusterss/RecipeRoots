const mongoose=require("mongoose")

const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
    },
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    
    Image:{
        type:String,
    },

},{timestamps:true})

module.exports=mongoose.model("Recipes",recipeSchema)