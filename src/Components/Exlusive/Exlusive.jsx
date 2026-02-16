import ExlusiveBanner from "..///../assets/erasebg-transformed.png";
import "../Exlusive/Exlusive.css";
function Exlusive(){
    return(
         <div className="Exlusive-main">
            <div className="Left-container">
                <img src={ExlusiveBanner} alt="" />
            </div>
            <div className="Right-container">
                <p id="Exlusive-Bold">Exlusive<br/>
                Offer For You</p>
                <p id="Exlusive-Text">ONLY ON THE BEST PRODUCTS</p>
                <button>Check Now</button>
            </div>
        </div>
    );
}
export default Exlusive;