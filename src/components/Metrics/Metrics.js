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

function Metrics({ stateChanger, ...props }) {
    let user = props.data.user;
    return (
        <div className="metrics">
            <Navbar />
            <div className="grid-one">
                <DailyMetric
                    title={"Cash Balance (USD)"}
                    subtitle={`$${user.wallet.balance.cash.toString() || NaN}`}
                    transactions={user.transactions.cash}
                    currency={"cash"}
                    wallet={user.wallet}
                    username={user.username}
                    stateChanger={stateChanger}
                />
                <DailyMetric
                    title={"Crypto Balance (BTC)"}
                    subtitle={`${user.wallet.balance.crypto.toString() || NaN} BTC`}
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
