import "../Hero/Hero.css";
import { Link } from "react-router-dom";
import ModelLanding from ".././/../assets/erasebg-transformed (3).avif";
function Hero(){
    return(
        <div className="Hero-Main">
            <div className="Hero-Left">
                <h1>VHONGDRIP STORE</h1>
                <p>LEVEL UP UOUR STYLE. OWN THE DRIP.</p>
           
                <Link to={"/home"}>
                <button 
                id="ShopNow-Landing">SHOP NOW</    button>
                </Link>
                <Link to="drops">
                <button 
                id="ExploreNow-Landing">EXPLORE COLLECTION
                </button>
                </Link>
            </div>
            <div className="Hero-Right">
                <img src={ModelLanding} alt="" />
            </div>
        </div>
    );
}
export default Hero;