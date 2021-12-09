import React from "react";

function Navbar(props) {
    return (
        <div className="navbar">
            <h1>{props.title}</h1>
            <div className="info">
                <h4>{`${props.username}'s Mirai Wallet`}</h4>
                <div className="avatar">
                    <img src="https://i.imgur.com/ixlnDYs.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
