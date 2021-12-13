import React from "react";
// import { BsArrowRight } from "react-icons/bs";

function Transactions({ stateChanger, ...props }) {
    var transactions = [].concat(props.transactions).reverse();
    return (
        <div className="transactions__title">
            <div className="transactions__info">
                <div style={{ marginBottom: "1rem" }}>
                    <h3>{props.moneyType} Transactions</h3>
                    {/* <span>Descending Order</span> */}
                </div>
                {/* <div className="icon" style={{ backgroundColor: "#eee657" }}>
                    <BsArrowRight />
                </div> */}
            </div>
            <ul style={{ listStyleType: "none", maxHeight: "17rem", overflow: "auto", paddingRight: "0.5rem" }}>
                {transactions.map((transaction, index) => {
                    return (
                        <li key={index}>
                            <div className="transaction" style={{ borderBottom: "1px black solid", paddingBottom: "1rem" }}>
                                <div className="transaction__info">
                                    <h4 style={{ fontSize: "1rem" }}>{transaction.name}</h4> {/* example: "Burger King" */}
                                    <span style={{ fontSize: "0.7rem" }}>{transaction.date}</span>
                                </div>
                                <div className="transaction__meta">
                                    <span style={{ fontSize: "0.7rem" }}>{transaction.type}</span> {/* either 'Outgoing' or 'Incoming" */}
                                    <span style={{ fontSize: "0.7rem" }}>
                                        {+parseFloat(transaction.amount).toFixed(props.moneyType === "Cash" ? 2 : 5) || " "}
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Transactions;
