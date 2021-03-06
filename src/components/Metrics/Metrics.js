import React from "react";
import Navbar from "./Navbar";
import DailyMetric from "./DailyMetric/DailyMetric";
import Transactions from "./Transactions/Transactions";

let noTransactions = [
    {
        id: 0,
        name: "No Transactions",
        date: "",
        type: "",
        amount: "",
    },
];

function Metrics({ pageChanger, stateChanger, ...props }) {
    let user = props.data.user;
    return (
        <div className="metrics">
            <Navbar title={"Overview"} username={user.firstName} pageChanger={pageChanger} />
            <div className="grid-one">
                <DailyMetric
                    title={"Cash Balance (USD)"}
                    subtitle={`$${parseFloat(user.wallet.balance.cash).toFixed(2).toString() || 0}`}
                    transactions={user.transactions.cash}
                    currency={"cash"}
                    wallet={user.wallet}
                    username={user.username}
                    name={user.firstName + " " + user.lastName}
                    stateChanger={stateChanger}
                />
                <DailyMetric
                    title={"Crypto Balance (BTC)"}
                    subtitle={`${+parseFloat(user.wallet.balance.crypto).toFixed(5).toString() || 0} BTC`}
                    transactions={user.transactions.crypto}
                    currency={"crypto"}
                    wallet={user.wallet}
                    username={user.username}
                    stateChanger={stateChanger}
                />
            </div>
            <div className="grid-two">
                <Transactions
                    moneyType={"Cash"}
                    transactions={user.transactions.cash.length > 0 ? user.transactions.cash : noTransactions}
                    stateChanger={stateChanger}
                />
                <Transactions
                    moneyType={"Crypto"}
                    transactions={user.transactions.crypto.length > 0 ? user.transactions.crypto : noTransactions}
                    stateChanger={stateChanger}
                />
            </div>
        </div>
    );
}

export default Metrics;
