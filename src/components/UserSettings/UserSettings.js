import React from "react";
import Navbar from "../Metrics/Navbar";
import classNames from "classnames";
import { useAlert } from "react-alert";

function UserSettings({ pageChanger, stateChanger, ...props }) {
    const alert = useAlert();
    let user = props.data.user;

    const firstName = React.useRef(null);
    const lastName = React.useRef(null);
    const currentPassword = React.useRef(null);
    const newPassword = React.useRef(null);
    const debitCardNumber = React.useRef(null);
    const debitCardExpiry = React.useRef(null);
    const debitCardCVV = React.useRef(null);
    const debitCardZip = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let modificationsAllowed = ["firstName", "lastName", "password", "debitCardNumber", "debitCardCVV", "debitCardExpiry", "debitCardZip"];
        let modifiedUser = {};
        for (let i = 0; i < modificationsAllowed.length; i++) {
            if (modificationsAllowed[i] === "firstName" && user[modificationsAllowed[i]] !== firstName.current.value) {
                modifiedUser[modificationsAllowed[i]] = firstName.current.value;
            }
            if (modificationsAllowed[i] === "lastName" && user[modificationsAllowed[i]] !== lastName.current.value) {
                modifiedUser[modificationsAllowed[i]] = lastName.current.value;
            }
            if (modificationsAllowed[i] === "password") {
                modifiedUser[modificationsAllowed[i]] = [currentPassword.current.value, newPassword.current.value || null];
            }
            if (modificationsAllowed[i] === "debitCardNumber" && debitCardNumber.current.value) {
                modifiedUser[modificationsAllowed[i]] = debitCardNumber.current.value;
            }
            if (modificationsAllowed[i] === "debitCardExpiry" && debitCardExpiry.current.value) {
                modifiedUser[modificationsAllowed[i]] = debitCardExpiry.current.value;
            }
            if (modificationsAllowed[i] === "debitCardCVV" && debitCardCVV.current.value) {
                modifiedUser[modificationsAllowed[i]] = debitCardCVV.current.value;
            }
            if (modificationsAllowed[i] === "debitCardZip" && debitCardZip.current.value) {
                modifiedUser[modificationsAllowed[i]] = debitCardZip.current.value;
            }
        }
        let modify = await fetch(
            `${
                window.location.href.includes("jahaanjain.com")
                    ? process.env.REACT_APP_API_BASE_URL.split(" ")[1]
                    : process.env.REACT_APP_API_BASE_URL.split(" ")[0] || "http://localhost:3001"
            }/users/modify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ modifiedUser }),
                credentials: "include",
            }
        );
        let json = await modify.json();
        if (modify.status === 200) {
            alert.success(json.message);
            stateChanger(performance.now());
            console.log("Modifications success:", json);
        } else {
            alert.error(json.message);
            console.error(json.message || "Modifications failed");
        }
    };

    return (
        <div className="settings">
            <Navbar title={"Settings"} username={user.firstName} pageChanger={pageChanger} />
            <div className="grid-one">
                <div className="top__card">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="formH1">Profile</div>
                        <div className="row">
                            <label className="formLabel">First Name:</label>
                            <input
                                className="formInput"
                                type="text"
                                name="firstName"
                                defaultValue={user.firstName}
                                ref={firstName}
                                minLength="3"
                                maxLength="50"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="row">
                            <label className="formLabel">Last Name:</label>
                            <input
                                className="formInput"
                                type="text"
                                name="lastName"
                                defaultValue={user.lastName}
                                ref={lastName}
                                minLength="3"
                                maxLength="50"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="row">
                            <label className="formLabel">Username/Email:</label>
                            <input className="formInput" type="text" name="email" defaultValue={user.username} disabled />
                        </div>
                        <div className="formH1">Bank Debit Card</div>
                        <div className="row">
                            <label className="formLabel">Card Number</label>
                            <input
                                className="formInput"
                                type="text"
                                name="debitCardNumber"
                                placeholder={user.cashFunding.debitCardNumber}
                                ref={debitCardNumber}
                                minLength="15"
                                maxLength="16"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="row-card-details">
                            <div className="card-details">
                                <label className="formLabel" style={{ paddingBottom: "0.3rem" }}>
                                    MM/YY:
                                </label>
                                <input
                                    className={classNames("formInput", "card-expiry")}
                                    type="text"
                                    name="expiry"
                                    placeholder={user.cashFunding.debitCardExpiry}
                                    ref={debitCardExpiry}
                                    minLength="5"
                                    maxLength="5"
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="card-details">
                                <label className="formLabel" style={{ paddingBottom: "0.3rem" }}>
                                    CVV:
                                </label>
                                <input
                                    className={classNames("formInput", "card-cvv")}
                                    type="text"
                                    name="cvv"
                                    placeholder={user.cashFunding.debitCardCVV}
                                    ref={debitCardCVV}
                                    minLength="3"
                                    maxLength="4"
                                    autoComplete="new-password"
                                />
                            </div>
                            <div className="card-details">
                                <label className="formLabel" style={{ paddingBottom: "0.3rem" }}>
                                    ZIP:
                                </label>
                                <input
                                    className={classNames("formInput", "card-zip")}
                                    type="text"
                                    name="zipcode"
                                    placeholder={user.cashFunding.debitCardZip}
                                    ref={debitCardZip}
                                    minLength="5"
                                    maxLength="5"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div className="formH1">Password</div>
                        <div className="row">
                            <label className="formLabel">Current Password:</label>
                            <input
                                className="formInput"
                                type="password"
                                name="currentPassword"
                                ref={currentPassword}
                                placeholder={"************"}
                                required
                                minLength="9"
                                maxLength="50"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="row">
                            <label className="formLabel">New Password:</label>
                            <input
                                className="formInput"
                                type="password"
                                name="newPassword"
                                ref={newPassword}
                                placeholder={"************"}
                                minLength="9"
                                maxLength="50"
                            />
                        </div>
                        <button type="submit" className="formButton">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
