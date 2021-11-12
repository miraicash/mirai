import React from "react";
import Navbar from "./Navbar";
import DailyMetric from "./DailyMetric/DailyMetric";
import Transactions from "./Transactions/Transactions";

let cashTransactions = [
    {
        name: "Burger King",
        date: "10/12/2021",
        type: "Outgoing",
        amount: "$15",
    },
    {
        name: "Kohls",
        date: "10/11/2021",
        type: "Outgoing",
        amount: "$59.18",
    },
    {
        name: "NYIT",
        date: "10/10/2021",
        type: "Incoming",
        amount: "$908.31",
    },
];

let cryptoTransactions = [
    {
        name: "OpenSea",
        date: "11/12/2021",
        type: "Outgoing",
        amount: "0.55 BTC",
    },
    {
        name: "MiningLLC",
        date: "11/12/2021",
        type: "Incoming",
        amount: "2.3 BTC",
    },
    {
        name: "GameStop",
        date: "11/11/2021",
        type: "Outgoing",
        amount: "0.039 BTC",
    },
];

function Metrics(props) {
    return (
        <div className="metrics">
            <Navbar />
            <div className="grid-one">
                <DailyMetric title={"Cash Balance (USD)"} subtitle={"$100"} />
                <DailyMetric title={"Crypto Balance (BTC)"} subtitle={"0.45 BTC"} />
            </div>
            <div className="grid-two">
                <Transactions moneyType={"Cash"} transactions={cashTransactions} />
                <Transactions moneyType={"Crypto"} transactions={cryptoTransactions} />
            </div>
        </div>
    );
}

export default Metrics;
