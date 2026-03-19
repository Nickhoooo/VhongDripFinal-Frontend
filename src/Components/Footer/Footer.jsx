import "./Footer.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo (1).png";

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
            {/*ETO PRE LALAGYAN NG MGA LINK NEED NYO GUMAWA NG ACC FOR VHONGDRIP SYEMPRE TAS PAG NAKAGAWA NA KAU KUNIN NYO LINK TAS PASTE NA LANG GANUN O KAAYA CHAT GPT NYO HOW TO PUT A LINK ON REACT.JS*/}

            {/*ask ka lang sakin pre pag may tanong ka*/}


            <div className="SocialMedia">

            </div>
            <hr />
            <div className="Owner">
                <p id="Copyright">Copyright @ 2026 All Right Reserved</p>
            </div>
        </div>
    );
}
export default Footer;