import "../Pages/CSS/SignUp.css";
import Display from "../assets/FormDisplay.png";
import GmailImage from "../assets/gmail-account.png";
import FacebookImage from "../assets/facebook-account.png";
import TiktokImage from "../assets/tiktok-account.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/Header";

function SignUp(){

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        email: "",
        username: "",
        password: "",
        terms: false
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

     const handleSubmit = async (e) =>{
        e.preventDefault();

        const firstname = formData.firstname;
        const lastname = formData.lastname;
        const phone = formData.phone;
        const address = formData.address;
        const email = formData.email.trim();
        const username = formData.username.trim();
        const password = formData.password;
        const term = formData.terms;


    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        alert("Invalid email address");
        return;
    } if (username.length < 3) {
        alert ("Username is too short");
        return;
    } if (password.length < 6){
        alert ("your password is too short");
        return;
    } if (!term) {
        alert ("You must accept terms and conditions");
        return;
    } 
    if (firstname.length > 50){
        alert ("Your name is too long");
        return;
    }
    if (lastname.length > 50){
        alert ("Your last name is too long");
        return;
    }
     if (phone.length !== 11){
        alert ("invalid phone number");
        return;
    }

    const form = new URLSearchParams(formData).toString();
    const res = await fetch("http://localhost/backend/public/register", {
    method: "POST",
    credentials: "include", 
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form
    })

    if (!res.ok) {
        alert(`Server error: ${res.status} ${res.statusText}`);
        return;
    }

    let data;
    try {
        const text = await res.text();
        console.log("Response:", text);
        data = JSON.parse(text);
    } catch (e) {
        console.error("Parse error:", e);
        alert("Server error: Invalid response. Check console for details.");
        return;
    }

    if (data.status === "success"){
        alert(data.message);
        window.location.href = "/login";
    } else {
        alert(data.error || data.message || "An error occurred");
    }

    };

    const next = () =>{
        setStep(step + 1);
    }

    const back = () =>{
        setStep(step - 1);
    }


    return(
        <>
        <Header/>
         <div>
             <div className="SignUppage-Main">
            <div className="SignUppage">
                
            <div className="FormSignUp-container">
                    <label id="SignUp-Text">Sign-up</label>
                <form onSubmit={handleSubmit} id="SignUpForm">
                    { step === 1 && (
                    <div className="step1">
                            <input
                            className="Input-SignUp"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                             />

                            <input
                            className="Input-SignUp"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            />

                            <input
                            className="Input-SignUp"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            />

                           <input
                            className="Input-SignUp"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                             />

                        <button 
                        id="Next-btn"
                        type="button"
                        onClick={next}>Next
                        </button>
                    </div>
                    )}

                    { step === 2 && (
                        <div className="step2">
                             <input 
                            className="Input-SignUp" 
                            name="email" 
                            type="email" 
                            placeholder="Email" 
                            value={formData.email} onChange={handleChange}
                            />
                            <input 
                            className="Input-SignUp" 
                            name="username" 
                            type="text" 
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleChange}
                            />
                            <input 
                            className="Input-SignUp" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange}
                            />
                        <div className="CheckLine">

                            <input type="checkbox" 
                            name="terms" 
                            checked={formData.terms} 
                            onChange={handleChange}
                            />

                            <label>By continuing, I agree to the terms of use & privacy policy.</label>
                        </div>

                        <div className="btn-register">
                            <button
                            name="register" 
                            type="submit" 
                            id="SubmitBtn">Submit
                            </button> 

                             <button 
                             id="back-btn"
                             type="button" 
                             onClick={back}>Back
                            </button> 
                        </div>
                            

                        </div>
                    )} </form>

                <div className="social-mediaAcc">
                    <img src={GmailImage} alt="" />
                    <img src={FacebookImage} alt="" />
                    <img src={TiktokImage} alt="" />
                    
                </div>
                <label id="Clickhere">Already hava an account?<Link to={'/login'}><span>Click here</span></Link></label>
            </div>

                <div className="left-imageSignup">
                    <img src={Display} alt="" />
                </div>
                
            </div>
        </div>
        </div>
        
        
        </>

       
    );
}
export default SignUp;