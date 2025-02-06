import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData,setRecipeData]=useState({
        title: '',
        time: '',
        ingredients: [],
        instructions: '',
        file: null
    });
    const navigate=useNavigate();

    const onHandleChange=(e)=>{
        
        let value;
        if(e.target.name==="ingredients")
            {
               value= e.target.value.split(",");
            } 
        else if (e.target.name==="file")
            {
              value= e.target.files[0];
            } 
            else
            {
               value= e.target.value;
            }
        setRecipeData(prev=>({...prev,[e.target.name]:value}));
    };
    const onHandleSubmit=async(e)=>{
        e.preventDefault();
       
        console.log("Form data:",recipeData);

        const formData = new FormData();

        formData.append("title", recipeData.title );
        formData.append("time", recipeData.time );
        formData.append("ingredients",  recipeData.ingredients.join(","));
        formData.append("instructions", recipeData.instructions);
        
        
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        console.log("Submitting FormData:", [...formData]); // Debugging
        try{
        const response=await axios.post("http://localhost:5000/recipe",formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                 'authorization': 'bearer '+localStorage.getItem("token")
            },
        });
        console.log("upload success:",response.data);
        navigate("/");
    }
    catch(error){
        console.error("Error uploading recipe:",error.response?.data||error.message)
    }
    }
  return (
    <>
    <div className='container'>
        <form className='form' onSubmit={onHandleSubmit}>
            <div className='form-control'>
                <label>Title</label>
                <input type="text" className='input' name='title' value={recipeData.title} onChange={onHandleChange}></input>
            </div>
            <div className='form-control'>
                <label>Time</label>
                <input type="text" className='input' name='time'value={recipeData.time} onChange={onHandleChange}></input>
            </div>
            <div className='form-control'>
                <label>Ingredients</label>
                <textarea type="text" className='input-textarea' name='ingredients' rows='5' value={recipeData.ingredients.join(",")} onChange={onHandleChange}></textarea>       
            </div>
            <div className='form-control'>
                <label>Instructions</label>
                <textarea type="text" className='input-textarea' name='instructions' rows='5' value={recipeData.instructions} onChange={onHandleChange}></textarea>
            </div>
            <div className='form-control'>
                <label>Recipe Image</label>
                <input type="file" className='input' name='file' onChange={onHandleChange}></input>
            </div>
            <button type="submit"> Add Recipe</button>
        </form>
        </div>
        </>
  );
}
