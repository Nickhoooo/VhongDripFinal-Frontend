import "../Pages/CSS/Login.css";
import Display from "../assets/FormDisplay.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

function LogIn() {
  const navigate = useNavigate(); 
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

        const res = await fetch("https://vhongsdrip.great-site.net/login", {
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

          if (data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }

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
    <Footer/>
    </>
  );
}

export default LogIn;
