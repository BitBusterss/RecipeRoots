import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData,setRecipeData]=useState({
        title: '',
        time: '',
        ingredients: [],
        instructions: '',
        file: null
    });
    const navigate=useNavigate();
    const {id} = useParams()
    useEffect(()=>{
        const getData = async()=>{
            await axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response=>{
                let res = response.data
                setRecipeData({
                    title : res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData();
    },[])
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
        formData.append("ingredients",  recipeData.ingredients);
        formData.append("instructions", recipeData.instructions);
        
        
        if (recipeData.file) {
            formData.append("file", recipeData.file);
        }

        console.log("Submitting FormData:", [...formData]); // Debugging
        try{
        const response=await axios.put(`http://localhost:5000/recipe/${id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                 'authorization': 'bearer '+localStorage.getItem("token")
            },
        });
        console.log("upload success:",response.data);
        navigate("/myRecipe");
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
                <textarea type="text" className='input-textarea' name='ingredients' rows='5' value={recipeData.ingredients} onChange={onHandleChange}></textarea>       
            </div>
            <div className='form-control'>
                <label>Instructions</label>
                <textarea type="text" className='input-textarea' name='instructions' rows='5' value={recipeData.instructions} onChange={onHandleChange}></textarea>
            </div>
            <div className='form-control'>
                <label>Recipe Image</label>
                <input type="file" className='input' name='file' onChange={onHandleChange}></input>
            </div>
            <button type="submit"> Edit Recipe</button>
        </form>
        </div>
        </>
  );
}
