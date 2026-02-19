import "../Pages/CSS/Login.css";
import Display from "../assets/FormDisplay.png";
import GmailImage from "../assets/gmail-account.png";
import FacebookImage from "../assets/facebook-account.png";
import TiktokImage from "../assets/tiktok-account.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/Header";

function LogIn() {



  const [formData, setFormData] = useState({
    email: "",
    password: "",
    terms: false
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Validation (add this!)
    if (!formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
    }

    if (!formData.terms) {
        alert("You must agree to the terms");
        return;
    }

    try {
        const formBody = new URLSearchParams({
            email: formData.email,
            password: formData.password,
            terms: formData.terms ? 'true' : 'false'
        }).toString();

        const res = await fetch("https://vhongsdrip.great-site.net/public/login", {
            method: "POST",
            credentials: "include", 
            headers: { "Content-Type": "application/x-www-form-urlencoded" },  
            body: formBody  
        });

        if (!res.ok) {
            alert(`Server error: ${res.status}`);
            return;
        }

        const data = await res.json();
        console.log("Response:", data);

        if (data.status === "success") {
      
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            alert("Login successful!");
            window.location.href = "/home";
        } else {
            alert(data.message || "Login failed");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Network error. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="Loginpage-Main">
      <div className="Loginpage">
        <div className="FormLogin-container">
          <label id="Login-Text">Log-in</label>

          {/*onSubmit now calls handleLogin */}
          <form onSubmit={handleLogin} id="LoginForm">
            <input
              className="Input-SignUp"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
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
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange} 
              />
              <label>
                By continuing, I agree to the terms of use & privacy policy.
              </label>
            </div>

            <input
              className="Input-Login"
              type="submit"
              value="Submit"
              id="SubmitBtn-Login"
            />
          </form>

          <div className="social-mediaAcc">
            <img src={GmailImage} alt="" />
            <img src={FacebookImage} alt="" />
            <img src={TiktokImage} alt="" />
          </div>
          <label id="Clickhere">
            Don’t have an account?
            <Link to={"/signup"}>
              <span>Click here</span>
            </Link>
          </label>
        </div>

        <div className="left-imageLogin">
          <img src={Display} alt="" />
        </div>
      </div>
    </div>
    
    </>

    
  );
}

export default LogIn;
