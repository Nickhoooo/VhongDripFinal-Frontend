import "../admin/css/ManageProduct.css"
import CompanyLogo from "../assets/ardor.png";
import UserIcon from "../assets/user (6).png";
import ManageIcon from "../assets/new-product.png";
import PaymentVeriIcon from "../assets/logistics-management.png";
import { Link } from "react-router-dom";
import logout from "../assets/logout.png";
import { useEffect, useState } from "react";
function ManageProduct(){

    const [products,setProducts] = useState([]);
    const [showModal,setShowModal] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [details, setDetails] = useState("")
    const [image, setImage] = useState(null)


   const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("details", details);
        formData.append("image", image);

    fetch("https://vhongsdrip.great-site.net/newdrop/add", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(() => {
        setShowModal(false);
        fetchProducts(); // refresh list
    });
    };

    const fetchProducts = () => {
    Promise.all([
        fetch("https://vhongsdrip.great-site.net/products").then(res => res.json()),
        fetch("https://vhongsdrip.great-site.net/newdrop").then(res => res.json())
    ]).then(([products, newdrops]) => {
        const productData = products.map(item => ({ ...item, type: "product" }));
        const newDropData = newdrops.map(item => ({ ...item, type: "newdrop" }));
        setProducts([...productData, ...newDropData]);
    });
    };

    useEffect(() => {
        fetchProducts(); // ✅ just call it here
    }, []);


    useEffect(() => {
    Promise.all([
        fetch("https://vhongsdrip.great-site.net/products").then(res => res.json()),
        fetch("https://vhongsdrip.great-site.net/newdrop").then(res => res.json())
    ])

    .then(([products, newdrops]) => {
        const productData = products.map(item => ({
        ...item,
        type: "product"
        }));

        const newDropData = newdrops.map(item => ({
        ...item,
        type: "newdrop"
        }));

        setProducts([...productData, ...newDropData]);

    });

    }, []);

    const deleteProduct = (id, type) => {
    const endpoint = type === "newdrop"
        ? "https://vhongsdrip.great-site.net/newdrop/delete"
        : "https://vhongsdrip.great-site.net/products/delete";

    fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(() => fetchProducts());
};

    


    return(
         <div className="Main-Manage">
        
             {/**HEADER PO ITUUUU */}
            <div className="Header-Top">
                <Link to={'/admin'}>
                <img src={CompanyLogo} alt="" />
                </Link>
                
                <h1>Admin Panel</h1>
            </div>
            {/**SIDEBAR PO ITUUUU */}
            <div className="Sidebar">
                <Link to={'/users'}>
                <img id="UserIcon" src={UserIcon} alt="" />
                <p id="User-Text">Users</p>
                </Link>
                
                <Link to={'/manage'}>
                <img id="MP-Icon" src={ManageIcon} alt="" />
                <p id="ManageProduct">Manage Product</p>
                </Link>
                
                <Link to={'/payment'}>
                <img id="PaymentVeriIcon" src={PaymentVeriIcon} alt="" />
                <p id="PaymentVeri-Text">Payment Verification</p>
                </Link>

                <Link to={"/"}>
                <img src={logout} alt="" id="logout"/>
                <p id="logout-text">Logout</p>
                </Link>
                
            </div>
                    
            {/**MAIN CONTENT NG DASHBOARD PO ITUUUU */}
            <div className="Manage-Content">
                <h2>Manage Product</h2>
                <button 
                    onClick={()=>setShowModal(true)}>
                    Add Product
                </button>
                {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Add New Drop Product</h2>
                        <form onSubmit={handleAddProduct}>
                        <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                        <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        />
                        <select
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                        <option value="">Category</option>
                        <option value="Tshirt">Tshirt</option>
                        <option value="LongSleeve">Long Sleeve</option>
                        <option value="Pants">Pants</option>
                        </select>

                        <textarea
                        placeholder="Product Details"
                        value={details}
                        onChange={(e)=>setDetails(e.target.value)}
                        />
                        <input
                        type="file"
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                        <div className="modal-buttons">
                        <button type="submit">Add Product</button>
                        <button
                        type="button"
                        onClick={()=>setShowModal(false)}
                        >
                        Cancel
                        </button>

                        </div>

                        </form>

                    </div>

                </div>
                )}            

                <table  border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
                </thead>   

            <tbody>
                {products.map(product => (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                <img 
                    id="Img-Data"
                    src={`https://vhongsdrip.great-site.net/images/${product.image}`} 
                    alt={product.name}
                />
                </td>
                <td>
                    <button onClick={() => deleteProduct(product.id, product.type)}>Delete</button>
                </td>
                </tr>
                ))}
             </tbody>
            </table>
                    
            </div>
            
        </div>
    );
}
export default ManageProduct;