import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo (1).png";
import Facebook from "../../assets/facebook (1).png";
import Instagram from "../../assets/instagram (1).png" 
import Tiktok from "../../assets/social-media.png";

function Footer(){
    return(
        <div className="Footer-container">
            <div className="Company-Name">
                <img src={Logo} alt="CompanytLogo" />
                <p>VhongDrip Store</p>
            </div>
            <div className="About-us">
                 <nav className="Navbar">
                    <Link to="/company">Company</Link>
                    <Link to="/home">Product</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                 </nav>
            </div>
            <div className="SocialMedia">
                <img src={Facebook} alt="FacebookIcon" />
                <img src={Instagram} alt="InstagramIcon" />
                <img src={Tiktok} alt="TiktokIcon" />
            </div>
            <hr />
            <div className="Owner">
                <p id="Copyright">Copyright @ 2026 All Right Reserved</p>
            </div>
        </div>
    );
}
export default Footer;