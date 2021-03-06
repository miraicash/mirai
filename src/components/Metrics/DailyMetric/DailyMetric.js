import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BsPlus, BsDash, BsNewspaper } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane } from "react-icons/bi";
import ReactTooltip from "react-tooltip";
import VCC from "../../VCC/VCC";
import { useAlert } from "react-alert";
import CurrencyInput from "./CurrencyInput";

const noTransactions = [
    {
        amount: 0,
    },
];

function DailyMetric({ stateChanger, ...props }) {
    const alert = useAlert();

    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showSendRecieve, setShowSendRecieve] = useState(false);
    const [amount, setAmount] = useState(0.0);
    const [showConverter, setShowConverter] = useState(false);
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState("BTC");
    const [currency2, setCurrency2] = useState("USD");
    const [rates, setRates] = useState([]);
    const exchangeRatesapi = `${
        window.location.href.includes("jahaanjain.com")
            ? process.env.REACT_APP_API_BASE_URL.split(" ")[1]
            : process.env.REACT_APP_API_BASE_URL.split(" ")[0] || "http://localhost:3001"
    }/payments/rates`;

    useEffect(() => {
        fetch(exchangeRatesapi)
            .then((res) => res.json())
            .then((response) => {
                // console.log(response);
                setRates(response.data.rates);
            });
    }, []);

    useEffect(() => {
        if (!!rates) {
            handleAmount1Change(amount1);
        }
    }, [rates]);

    function format(number) {
        return number.toFixed(5);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
        setCurrency2(currency2);
    }

    const handleShowDeposit = () => setShowDeposit(true);
    const handleCloseDeposit = () => setShowDeposit(false);
    const handleCloseAndDeposit = async () => {
        console.log("deposit:", parseFloat(amount));
        setShowDeposit(false);
        if (parseFloat(amount) <= 0) {
            alert.error("Please enter a valid amount");
            return;
        }
        let handler = await fetch(
            `${
                window.location.href.includes("jahaanjain.com")
                    ? process.env.REACT_APP_API_BASE_URL.split(" ")[1]
                    : process.env.REACT_APP_API_BASE_URL.split(" ")[0] || "http://localhost:3001"
            }/payments/deposit`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    currency: props.currency,
                    amount: parseFloat(amount),
                }),
            }
        );
        let json = await handler.json();
        if (handler.status === 200) {
            stateChanger(performance.now());
        } else {
            alert.error(json.message);
            console.error(json.message || "Deposit Failed");
        }
    };
    const handleShowWithdraw = () => setShowWithdraw(true);
    const handleCloseWithdraw = () => setShowWithdraw(false);
    const handleCloseAndWithdraw = async () => {
        console.log("withdraw:", parseFloat(amount));
        setShowWithdraw(false);
        if (parseFloat(amount) <= 0) {
            alert.error("Please enter a valid amount");
            return;
        }
        let handler = await fetch(
            `${
                window.location.href.includes("jahaanjain.com")
                    ? process.env.REACT_APP_API_BASE_URL.split(" ")[1]
                    : process.env.REACT_APP_API_BASE_URL.split(" ")[0] || "http://localhost:3001"
            }/payments/withdraw`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    currency: props.currency,
                    amount: parseFloat(amount),
                }),
            }
        );
        let json = await handler.json();
        if (handler.status === 200) {
            stateChanger(performance.now());
        } else {
            alert.error(json.message);
            console.error(json.message || "Withdraw Failed");
        }
    };
    const handleShowSendRecieve = () => setShowSendRecieve(true);
    const handleCloseSendRecieve = () => setShowSendRecieve(false);
    const handleShowConverter = () => setShowConverter(true);
    const handleCloseConverter = () => setShowConverter(false);
    const handleCloseAndConvert = async () => {
        console.log(`convert from ${amount1} ${currency1} to ${amount2} ${currency2}`);
        setShowConverter(false);
        let handler = await fetch(
            `${
                window.location.href.includes("jahaanjain.com")
                    ? process.env.REACT_APP_API_BASE_URL.split(" ")[1]
                    : process.env.REACT_APP_API_BASE_URL.split(" ")[0] || "http://localhost:3001"
            }/payments/convert`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    amountFrom: parseFloat(amount1),
                    amountTo: parseFloat(amount2),
                    convertFrom: currency1 === "BTC" ? "crypto" : "cash",
                    convertTo: currency2 === "BTC" ? "crypto" : "cash",
                }),
            }
        );
        let json = await handler.json();
        if (handler.status === 200) {
            stateChanger(performance.now());
        } else {
            alert.error(json.message);
            console.error(json.message || "Conversion Failed");
        }
    };
    return (
        <>
            <div className="top__card">
                <div className="top__card__info">
                    <div>
                        <h3>{props.title}</h3>
                        <span>{props.subtitle}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                        {props.currency === "cash" && (
                            <div className="icon" style={{ backgroundColor: "#fc6042", marginRight: "0.5rem" }} onClick={handleShowWithdraw}>
                                <BsDash data-tip="Withdraw" data-for={"withdrawTip" + props.currency} />
                            </div>
                        )}
                        <div className="icon" style={{ backgroundColor: "#2cc990", marginRight: "0.5rem" }} onClick={handleShowDeposit}>
                            <BsPlus data-tip="Deposit" data-for={"depositTip" + props.currency} />
                        </div>
                        <div className="icon" style={{ backgroundColor: "#63cad8", marginRight: "0.5rem" }} onClick={handleShowSendRecieve}>
                            <BiPaperPlane data-tip="Send/Recieve" data-for={"sendTip" + props.currency} />
                        </div>
                        <div className="icon" style={{ backgroundColor: "#2cc990" }} onClick={handleShowConverter}>
                            <BsNewspaper data-tip="Currency Exchange" data-for={"sendTip" + props.currency} />
                        </div>
                    </div>
                </div>
                <ReactTooltip effect="solid" id={"withdrawTip" + props.currency} />
                <ReactTooltip effect="solid" id={"depositTip" + props.currency} />
                <ReactTooltip effect="solid" id={"sendTip" + props.currency} />
                <ResponsiveContainer width="100%" height="80%">
                    <AreaChart
                        data={
                            props.transactions.length > 0
                                ? // ? props.transactions.map((x) => ({ id: `#${x.id}`, amount: x.type === "Incoming" ? x.amount : -x.amount }))
                                  props.transactions.map(function ({ id, type, amount }, i) {
                                      return {
                                          id: `#${id}`,
                                          amount: +(this.last = (this.last || 0) + (type === "Incoming" ? amount : -amount)).toFixed(
                                              props.currency === "cash" ? 2 : 5
                                          ),
                                      };
                                  }, {})
                                : noTransactions
                        }
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="30%" stopColor="#ff933d" stopOpacity={0.4} />
                                <stop offset="75%" stopColor="#ffd73d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ffa43d" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="id" label={{ value: "Transactions", position: "insideBottom", dy: 20 }} tick={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#ff683d" strokeWidth={2} fillOpacity={1} fill="url(#colorview)" />
                    </AreaChart>
                </ResponsiveContainer>
                <Modal show={showDeposit} onHide={handleCloseDeposit}>
                    <Modal.Header>
                        <Modal.Title>Deposit Money Into Mirai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ marginRight: "1rem", lineHeight: "2rem" }}>{"Amount to Deposit: "}</div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                style={{ height: "2rem", borderRadius: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeposit}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCloseAndDeposit}>
                            Deposit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showWithdraw} onHide={handleCloseWithdraw}>
                    <Modal.Header>
                        <Modal.Title>Withdraw Money From Mirai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ marginRight: "1rem", lineHeight: "2rem" }}>{"Amount to Withdraw: "}</div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                style={{ height: "2rem", borderRadius: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseWithdraw}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCloseAndWithdraw}>
                            Withdraw
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showSendRecieve} onHide={handleCloseSendRecieve}>
                    <Modal.Header>
                        <Modal.Title>Send or Recieve Money</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                        {props.currency === "cash" ? (
                            <VCC card={props.wallet.card} name={props.name} />
                        ) : (
                            <div>{`Your BTC address is: ${props.wallet.card.btc_address}`}</div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseSendRecieve}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConverter} onHide={handleCloseConverter}>
                    <Modal.Header>
                        <Modal.Title>Currency Converter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="amount1" style={{ marginLeft: "2rem " }}>
                            From:{" "}
                        </label>
                        <CurrencyInput
                            onAmountChange={handleAmount1Change}
                            onCurrencyChange={handleCurrency1Change}
                            currencies={Object.keys(rates)}
                            amount={parseFloat(amount1)}
                            currency={currency1}
                        />
                        <label htmlFor="amount1" style={{ marginLeft: "2rem " }}>
                            To:{" "}
                        </label>
                        <CurrencyInput
                            onAmountChange={handleAmount2Change}
                            onCurrencyChange={handleCurrency2Change}
                            currencies={Object.keys(rates)}
                            amount={parseFloat(amount2)}
                            currency={currency2}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConverter}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleCloseAndConvert}
                            disabled={(currency1 === "BTC" || currency2 === "USD") && (currency1 === "USD" || currency2 === "BTC") && currency1 !== currency2}
                        >
                            Convert
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default DailyMetric;
