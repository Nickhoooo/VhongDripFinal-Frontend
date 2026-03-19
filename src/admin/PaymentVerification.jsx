import { useState, useEffect } from "react";
import "../admin/css/PaymentVerification.css";
import CompanyLogo from "../assets/ardor.png";
import UserIcon from "../assets/user (6).png";
import ManageIcon from "../assets/new-product.png";
import PaymentVeriIcon from "../assets/logistics-management.png";
import { Link } from "react-router-dom";
import logout from "../assets/logout.png";

function PaymentVerification() {
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const res = await fetch("https://vhongsdrip.great-site.net/payments/pending", {
                credentials: "include",
            });
            const data = await res.json();
            setPayments(data);
        } catch (err) {
            console.error("Failed to fetch payments:", err);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const approve = async (id) => {
        try {
            await fetch("https://vhongsdrip.great-site.net/payments/approve", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchPayments(); // Refresh the list
        } catch (err) {
            console.error("Failed to approve payment:", err);
        }
    };

    const decline = async (id) => {
        try {
            await fetch("https://vhongsdrip.great-site.net/payments/decline", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            fetchPayments(); // Refresh the list
        } catch (err) {
            console.error("Failed to decline payment:", err);
        }
    };

    return (
        <div className="Main-Verification">
            {/* HEADER */}
            <div className="Header-Top">
                <Link to={"/admin"}>
                    <img src={CompanyLogo} alt="" />
                </Link>
                <h1>Admin Panel</h1>
            </div>

            {/* SIDEBAR */}
            <div className="Sidebar">
                <Link to={"/users"}>
                    <img id="UserIcon" src={UserIcon} alt="" />
                    <p id="User-Text">Users</p>
                </Link>
                <Link to={"/manage"}>
                    <img id="MP-Icon" src={ManageIcon} alt="" />
                    <p id="ManageProduct">Manage Product</p>
                </Link>
                <Link to={"/payment"}>
                    <img id="PaymentVeriIcon" src={PaymentVeriIcon} alt="" />
                    <p id="PaymentVeri-Text">Payment Verification</p>
                </Link>
                <Link to={"/"}>
                    <img src={logout} alt="" id="logout" />
                    <p id="logout-text">Logout</p>
                </Link>
            </div>

            {/* MAIN CONTENT */}
            <div className="Verification-Content">
                <h2>Payment Verification</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Mode</th>
                            <th>Proof</th>
                            <th>Action</th>
                        </tr>
                    </thead>
            <tbody>
            {payments.length === 0 ? (
                    <tr>
                    <td colSpan="6">No pending payments.</td>
                    </tr>
                    ) : (
                    payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.username}</td>
                            <td>{payment.email}</td>
                            <td>{payment.payment_mode}</td>
                            <td>
                                <img
                                src={`https://vhongsdrip.great-site.net/payments/${payment.payment_proof}`}
                                width="60"
                                alt="proof"
                                />
                            </td>
                            <td>
                                <button onClick={() => approve(payment.id)}>Accept</button>
                                <button onClick={() => decline(payment.id)}>Decline</button>
                            </td>
                        </tr>
                        ))
                    )}
            </tbody>
        </table>
    </div>
</div>
    );
}

export default PaymentVerification;