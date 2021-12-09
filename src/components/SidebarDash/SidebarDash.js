import React from "react";
import { AiOutlineStock, AiOutlineDashboard, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import VCC from "../VCC/VCC";

function Sidebar({ pageChanger, ...props }) {
    console.log(props.data);

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
        <div className="sidebar">
            <div className="upper__container">
                <div className="brand" style={{ display: "flex", justifyContent: "center" }}>
                    <img src="https://i.imgur.com/evZmQKC.png" alt="" />
                </div>
                <div className="links">
                    <ul className="links-list">
                        <li className="dashboard-sidebar">
                            <AiOutlineDashboard />
                            <span onClick={() => pageChanger("dashboard")} style={{ cursor: "pointer" }}>
                                Dashboard
                            </span>
                        </li>
                        <li className="stocks-sidebar">
                            <AiOutlineStock />
                            <span onClick={() => pageChanger("stocks")} style={{ cursor: "pointer" }}>
                                Stocks
                            </span>
                        </li>
                        <li className="stocks-settings">
                            <AiOutlineSetting />
                            <span onClick={() => pageChanger("settings")} style={{ cursor: "pointer" }}>
                                Settings
                            </span>
                        </li>
                    </ul>
                    <hr style={{ marginBottom: "1.5rem" }} />
                    <VCC card={props.data.wallet.card} name={props.data.firstName + " " + props.data.lastName} />
                </div>
            </div>
            <div className="lower__container">
                <div className="logout-button-container">
                    <AiOutlineLogout className="logout-button-icon" />
                    <span onClick={handleLogout} className="logout-button">
                        Logout
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
