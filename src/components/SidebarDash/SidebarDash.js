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
                    </ul>
                </div>
            </div>
            <div className="lower__container">{/* <div className="container">Hello</div> */}</div>
        </div>
    );
}

export default Sidebar;
