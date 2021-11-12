import React from "react";
import { BsArrowRight } from "react-icons/bs";

function Transactions(props) {
    return (
        <div className="transactions__title">
            <div className="transactions__info">
                <div>
                    <h3>{props.moneyType} Transactions</h3>
                    {/* <span>Descending Order</span> */}
                </div>
                <div className="icon">
                    <BsArrowRight />
                </div>
            </div>
            <ul style={{ listStyleType: "none" }}>
                {props.transactions.map((transaction, index) => {
                    return (
                        <li key={transaction.transactionID}>
                            <div className="transaction">
                                <div className="transaction__info">
                                    <h4>{transaction.name}</h4> {/* example: "Burger King" */}
                                    <span>{transaction.date}</span>
                                </div>
                                <div className="transaction__meta">
                                    <span>{transaction.type}</span> {/* either 'Outgoing' or 'Incoming" */}
                                    <span>{transaction.amount}</span>
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
