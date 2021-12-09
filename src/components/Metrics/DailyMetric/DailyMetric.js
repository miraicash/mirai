import React, { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BsPlus, BsDash } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane } from "react-icons/bi";
import ReactTooltip from "react-tooltip";
import VCC from "../../VCC/VCC";
import { useAlert } from "react-alert";

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

    const handleShowDeposit = () => setShowDeposit(true);
    const handleCloseDeposit = () => setShowDeposit(false);
    const handleCloseAndDeposit = async () => {
        console.log("deposit:", parseFloat(amount));
        setShowDeposit(false);
        let handler = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/payments/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                currency: props.currency,
                amount: parseFloat(amount),
            }),
        });
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
        let handler = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/payments/withdraw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                currency: props.currency,
                amount: parseFloat(amount),
            }),
        });
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
                        <div className="icon" style={{ backgroundColor: "#63cad8" }} onClick={handleShowSendRecieve}>
                            <BiPaperPlane data-tip="Send/Recieve" data-for={"sendTip" + props.currency} />
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
                                ? props.transactions.map((x) => ({ id: `#${x.id}`, amount: x.type === "Incoming" ? x.amount : -x.amount }))
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
                        {"Amount to Deposit: "}
                        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
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
                        {"Amount to Withdraw: "}
                        <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
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
                            <VCC card={props.wallet.card} username={props.username} />
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
            </div>
        </>
    );
}

export default DailyMetric;
