import React from "react";

function Navbar(props) {
    return (
        <div className="navbar">
            <h1>Overview</h1>
            <div className="info">
                <h4>{props.username}</h4>
                <div className="avatar">
                    <img src="https://i.imgur.com/evZmQKC.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
