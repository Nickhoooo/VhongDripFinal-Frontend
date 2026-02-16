import "../pages/CSS/Contact.css";
import Cover from "../assets/Cover-Photo.avif";
import { useEffect } from "react";
import Header from "../Components/Header/Header";
function Contact(){
          
    return(
      <>
      <Header/>
       <div className="Contact-Main">
           <div className="Company" style={{ backgroundImage: `url(${Cover})` }}>
                <div className="Text">
                 <p id="Bold">Contact</p>
                <p>VhonDrip</p></div>

                <div>
                    <form action="" id="ContactForm">
                        <p id="tittle">Contact Form</p>
                        <input type="text"  id="Conname" placeholder="Name"/>
                        <input type="email" id="Conemail" placeholder="Email"/>
                        <textarea name="Message" id="Message" placeholder="Message"></textarea>
                        <input type="button"value="Submit" id="Button" />
                    </form>
                </div>
                 
               
            </div>
           
        </div>
      </>
       
    );
}
export default Contact;