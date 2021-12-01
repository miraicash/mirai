import React from "react";
import { MdViewHeadline } from "react-icons/md";
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
                    <ul>
                        {/* <li className="active">
                            <MdViewHeadline />
                            <a href="/dashboard">Overview</a>
                        </li> */}
                        <li>
                            <VCC card={props.data.wallet.card} username={props.data.username} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lower__container">{/* <div className="container">Hello</div> */}</div>
        </div>
    );
}

export default Sidebar;
