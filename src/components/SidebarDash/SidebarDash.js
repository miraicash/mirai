import React from "react";
import { AiOutlineStock, AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import VCC from "../VCC/VCC";

function Sidebar(props) {
    console.log(props.data);
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
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li className="stocks-sidebar">
                            <AiOutlineStock />
                            <a href="/stocks">Stocks</a>
                        </li>
                        <li className="stocks-settings">
                            <AiOutlineSetting />
                            <a href="/stocks">Settings</a>
                        </li>
                    </ul>
                    <hr style={{ marginBottom: "1.5rem" }} />
                    <VCC card={props.data.wallet.card} username={props.data.username} />
                </div>
            </div>
            <div className="lower__container">{/* <div className="container">Hello</div> */}</div>
        </div>
    );
}

export default Sidebar;
