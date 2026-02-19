import "../Pages/CSS/About.css";
import Cover from "../assets/Cover-Photo.avif";
import { useEffect } from "react";
import StoryModel from "../assets/Story-Model.avif";
import Header from "../Components/Header/Header";

function About(){
          
    return(
        <>
        <Header/>

         <div className="About-Main">
            <div className="Cover-Company" style={{ backgroundImage: `url(${Cover})` }}>
            <p id="Bold">About</p>
            <p>VhonDrip</p>
            </div>

            <div className="Story-Main">
                <div className="Story-child">
                    <div className="Circle-white"></div>
                    <div className="Story-Info">
                        <h1>Our Story</h1>
                        <p>VhonDrip started as a school project to apply web development skills in a real-world scenario.
                        The goal was to create a fully functional online clothing store with a modern and clean design, showcasing trendy streetwear-inspired fashion.</p>
                    </div>
                </div>
            </div>

            <div className="GoalContent">
                <div className="Goal-Container">
                    <div className="Goal-Info">
                        <h1>Our Goal</h1>
                        <p>The main goal of VhonDrip is to simulate a real online store experience, allowing users to:</p>
                        <p>Browse different products</p>
                        <p>Add items to the cart</p>
                        <p>Go through a basic checkout process</p>
                        <p>This helps students understand how e-commerce platforms work, from frontend design to simple backend logic.</p>
                    </div>
                    <div className="Circle-Container">
                        <img src={StoryModel} alt="" />
                    </div>
                </div>
            </div>
            
        </div>
        
        </>
       
    );
}
export default About;