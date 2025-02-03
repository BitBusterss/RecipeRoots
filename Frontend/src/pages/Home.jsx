import React from 'react'
import RecipeItems from "../components/RecipeItems"
import foodImg from '../assets/foodImg.jpg'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  return (
    <>
   
    <section>
        <div className='left'>
           <h1>Easy Recipes for any<strong>OCCASION</strong></h1>
           <h5>Welcome to <strong>RECIPE ROOTS</strong> discover a variety of delicious recipe, from quick meals to gourmet delights. Explore diverse cuisines, follow step-by-step guides,and even share your own recipes with our foodie community. Join us and bring the joy of cooking into your kitchen!</h5>
           <button onClick={()=>navigate("/addRecipe")} style={{ color: 'white', backgroundColor: 'black' }}>Share your recipe</button>

        </div>
        <div className="right">
            <img src={foodImg}></img>
        </div>
    </section>
    <div className="bg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3cb371" fill-opacity="1" d="M0,0L34.3,5.3C68.6,11,137,21,206,58.7C274.3,96,343,160,411,154.7C480,149,549,75,617,80C685.7,85,754,171,823,186.7C891.4,203,960,149,1029,149.3C1097.1,149,1166,203,1234,224C1302.9,245,1371,235,1406,229.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </div>
   
   <div className="recipe">
        <RecipeItems/>
   </div>
    </>
  )
}
export default Home