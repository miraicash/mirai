import React from "react";
import "./VCC.scss";

function VCC(props) {
    let expiry = props.card.expiry.toString();
    expiry = expiry.substring(0, 2) + "/" + expiry.substring(2, expiry.length);
    let cardNumber = props.card.number.toString();
    cardNumber = cardNumber.substring(0, 4) + " " + cardNumber.substring(4, 8) + " " + cardNumber.substring(8, 12) + " " + cardNumber.substring(12, 16);
    return (
        <>
            <div className="card">
                <div className="card__front card__part">
                    <img className="card__front-square card__square" src="https://i.imgur.com/EH4Noin.png" alt="" style={{ width: "3rem", height: "1rem" }} />
                    <img
                        className="card__front-logo card__logo"
                        src="https://i.imgur.com/L0lD0bz.png"
                        alt=""
                        style={{ width: "2rem", height: "2.2rem", marginTop: "-0.4rem" }}
                    />
                    <p className="card_numer">{cardNumber}</p>
                    <div className="card__space-75">
                        <span className="card__label">Card holder</span>
                        <p className="card__info">{props.name}</p>
                    </div>
                    <div className="card__space-25">
                        <span className="card__label">Expires</span>
                        <p className="card__info">{expiry}</p>
                    </div>
                </div>

                <div className="card__back card__part">
                    <div className="card__black-line"></div>
                    <div className="card__back-content">
                        <div className="card__secret">
                            <p className="card__secret--last">{props.card.cvv}</p>
                        </div>
                        <img
                            className="card__back-square card__square"
                            src="https://i.imgur.com/EH4Noin.png"
                            alt=""
                            style={{ width: "3rem", height: "1rem" }}
                        />
                        <img className="card__back-logo card__logo" src="https://i.imgur.com/L0lD0bz.png" alt="" style={{ width: "2rem", height: "2.2rem" }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VCC;
