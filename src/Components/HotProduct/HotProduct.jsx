import AllProduct from "../AllProduct/AllProduct";
import "../HotProduct/HotProduct.css";
import { useEffect, useState } from "react";

function HotProduct(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost/backend/public/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
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
                        .filter(product => product.id === "1") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "2") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "3") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className="HotProduct-Child">
                    {products
                        .filter(product => product.id === "4") 
                        .map(product => (
                        <AllProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default HotProduct;