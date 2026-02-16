import { useState, useEffect } from "react";
import DropsProduct from "../DropsProduct/DropsProduct";
import "../DropsMain/DropsMain.css"
function DropsMain(){

    const [newdrop, setNewdrop] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const filterCategory = (category) => {
        setSelectedCategory(category);
    } 

    useEffect(() => {
        fetch ("http://localhost/backend/public/newdrop")
        .then(res => res.json())
        .then(data => setNewdrop(data))
        .catch(err => console.log("ERROR: ", err));
    }, []);

    return(
    <div>
        <div className="Main-container">
            <div className="Category">
                <select id="category"
                value={selectedCategory}
                onChange={(e) => filterCategory(e.target.value)}>
                    <option value="" disabled selected>Category</option>
                    <option value="All">All</option>
                    <option value="Pants">Pants</option>
                    <option value="Tshirt">T-shirt</option>
                    <option value="Hoodie">Hoodie</option>
                    <option value="LongSleeve">LongSleeve</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sleeve">Sleeve</option>
                
                </select>
                <div className="right-category">
                    <p>Explore our newest streetwear collection.</p>
                </div>
            </div>

            <div className="Allproducts">
                {newdrop
                .filter(product => 
                    selectedCategory === "" ||
                    selectedCategory === "All" ||
                    product.category === selectedCategory
                )
                .map(product => (
                    <DropsProduct key={product.id} newdrop={product} />
                ))}
            </div>
        </div>
     </div>
    );
}
export default DropsMain;