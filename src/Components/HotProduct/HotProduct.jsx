import AllProduct from "../AllProduct/AllProduct";
import "../HotProduct/HotProduct.css";
import { useEffect, useState } from "react";

function HotProduct(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://vhongsdrip.great-site.net/products")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API Error:", data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <div className="HotProduct-Main">
            <h1>Hot Products</h1>
            <hr />
            <div className="HotProduct-Display">
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "5") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "6") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "7") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "8") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default HotProduct;