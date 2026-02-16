import "../DropsBanner/DropsBanner.css";import Model from "../../assets/erasebg-transformed (3).png"; 
function DropsBanner(){
    return(
        <div>
            <div className="Main-Premium">
            <div className="left-container">
                <p id="Premium-text">Premium street-style pieces now available</p>
                <p id="Grab-text">Grab your favorites before they’re gone.</p>
                <p id="promo-text">50% OFF <span>12hrs  </span> and <span>20min</span></p>
                <button>Check Here</button>    
            </div>

            <div className="right-container">
                <img src={Model} alt="" />
            </div>
        </div>
        </div>
    );
}
export default DropsBanner;