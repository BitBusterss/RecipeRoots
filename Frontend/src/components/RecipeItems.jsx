import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodImg.jpg'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './recipeItems.css'

export default function RecipeItems() {
    const allRecipes=useLoaderData()
    let path = window.location.pathname==="/myRecipe"? true : false
    console.log(allRecipes)
    return (
        <>
        <div className='card-container'>
            {
                allRecipes?.map((item,index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={`http://localhost:5000/images/${item.Image}`} width="300px" height="250px"></img>
                            <div className='card-body'>
                                <div className="title">{item.title}</div>
                                <div className="icons">
                                    <div className="timer"><BsFillStopwatchFill />30min</div>
                                   {(!path)? <FaHeart /> :
                                     <div className='action'>
                                   <Link to={`/editRecipe/${item._id}`} className='editIcon'> <FaEdit /></Link>
                                     <MdDelete className='deleteIcon'/>
                                     </div>
                               }
                               </div>
                            </div>
                            </div>
                    )
                }
                )
            }
        </div>
        </>
    )
}