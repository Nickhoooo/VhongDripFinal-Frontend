import "../admin/css/Dashboard.css"
import CompanyLogo from "../assets/ardor.png";
import UserIcon from "../assets/user (6).png";
import ManageIcon from "../assets/new-product.png";
import PaymentVeriIcon from "../assets/logistics-management.png";
import { Link } from "react-router-dom";
import UserDash from "../assets/user (7).png";
import verified from "../assets/payment-security.png";
import pending from "../assets/file.png";
import { useEffect, useState } from "react";
import logout from "../assets/logout.png";

function Dashboard(){
    const [stats, setStats] = useState({});

     useEffect(() => {
    fetch("https://vhongsdrip.great-site.net/dashboard")
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => setStats(data))
        .catch(err => console.error("Fetch error:", err)); // ✅ Add this
}, []);

    return(
        <div className="Main-Dashboard">

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
            <div className="Dashboard-Content">
                <div className="TotalOfUser-Container">
                    <img src={UserDash} alt="" />
                    <p>Total Of Users: </p>
                    <h2>{stats.totalUsers}</h2>
                </div>

                <div className="VerifiedUsers-Container">
                    <img src={verified} alt="" />
                    <p>Total Of Verified: </p>
                    <h2>{stats.verifiedUsers}</h2>
                </div>

                <div className="PendingPayment-Container">
                    <img src={pending} alt="" />
                    <p>Total of Pending Payments: </p>
                    <h2>{stats.pendingPayments}</h2>
                </div>



            </div>
        </div>
    );
}
export default Dashboard;