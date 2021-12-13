import React from "react";
import { AiOutlineStock, AiOutlineDashboard, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { useAlert } from "react-alert";

function Navbar({ pageChanger, ...props }) {
    const alert = useAlert();

    const handleLogout = async (e) => {
        e.preventDefault();
        let login = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        let json = await login.json();
        if (login.status === 200) {
            console.log("Logout success:", json);
            window.location.href = "/";
        } else {
            console.error(json.message || "Logout failed");
        }
    };

    return (
        <div className="navbar">
            <h1>{props.title}</h1>
            <div className="mobile-info">
                <div className="dashboard-icon-mobile" style={{ cursor: "pointer" }} onClick={() => pageChanger("dashboard")}>
                    <AiOutlineDashboard style={{ fontSize: "2rem" }} />
                </div>
                <div className="stock-icon-mobile" style={{ cursor: "pointer" }} onClick={() => alert.error("Stocks coming soon")}>
                    <AiOutlineStock style={{ fontSize: "2rem" }} />
                </div>
                <div className="dashboard-settings-mobile" style={{ cursor: "pointer" }}>
                    <AiOutlineSetting style={{ fontSize: "2rem" }} onClick={() => pageChanger("settings")} />
                </div>
                <div className="dashboard-logout-mobile" style={{ cursor: "pointer" }} onClick={handleLogout}>
                    <AiOutlineLogout style={{ fontSize: "2rem" }} />
                </div>
            </div>
            <div className="info">
                <h4>{`${props.username}'s Mirai Wallet`}</h4>
                <div className="avatar">
                    <img src="https://i.imgur.com/ixlnDYs.png" alt="avatar" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
