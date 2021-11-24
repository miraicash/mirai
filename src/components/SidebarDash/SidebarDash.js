import React from "react";
import { MdViewHeadline } from "react-icons/md";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="upper__container">
                <div className="brand">
                    <img src="https://i.imgur.com/evZmQKC.png" alt="" />
                </div>
                <div className="links">
                    <ul>
                        <li className="active">
                            <MdViewHeadline />
                            <a href="#">Overview</a>
                        </li>
                        <li className="active">
                            <MdViewHeadline />
                            <a href="#">CASH</a>
                        </li>
                        <li className="active">
                            <MdViewHeadline />
                            <a href="#">Crypto</a>
                        </li>
                        <li className="active">
                            <MdViewHeadline />
                            <a href="#">Transactions</a>
                        </li>
                    </ul >
                </div>
            </div>
            <div className="lower__container">{/* <div className="container">Hello</div> */}</div>
            <div className="settings">
                    <ul>
                        <li className="active">
                            <MdViewHeadline />
                            <a href="#">Settings</a>
                        </li>
                    </ul >
                </div>
        </div>
    );
}

export default Sidebar;
