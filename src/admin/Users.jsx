import "../admin/css/Users.css"
import CompanyLogo from "../assets/ardor.png";
import UserIcon from "../assets/user (6).png";
import ManageIcon from "../assets/new-product.png";
import PaymentVeriIcon from "../assets/logistics-management.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logout from "../assets/logout.png";

function Users(){
    const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("https://vhongsdrip.great-site.net/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBlock = (id) => {
        fetch("https://vhongsdrip.great-site.net/users/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
        }).then(() => fetchUsers());
    };

    const handleDelete = (id) => {
        fetch("https://vhongsdrip.great-site.net/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
        }).then(() => fetchUsers());
    };


    return(
     <div className="Main-Users">
        
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
        <div className="Users-Content">
            <h2>Users Table</h2>
            <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Verified</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                        {users.map(user => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>{user.is_verified ? "Yes" : "No"}</td>
                    <td>
                        <button onClick={() => handleBlock(user.id)}>
                        {user.status === "active" ? "Block" : "Unblock"}
                        </button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}
export default Users;