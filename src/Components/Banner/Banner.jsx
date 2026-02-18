import "../Banner/Banner.css";
import FashionMen from "../../assets/FashionMen.png";
function Banner(){
    return(
        <div className="Banner-Main">
             <div className="Banner-Right">
                <h1>Our Collection</h1>
                <p>Discover our latest drops and best-selling styles. From clean hoodies to drip sneakers, we’ve got everything you need to complete your fit.</p>
                <button>Shop Now</button>
            </div>
            <div className="Banner-Left">
                <img src={FashionMen} alt="" />
            </div>
           
        </div>
    );
}
export default Banner;