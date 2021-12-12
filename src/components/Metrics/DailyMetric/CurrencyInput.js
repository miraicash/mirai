import React from "react";
import PropTypes from "prop-types";

function CurrencyInput(props) {
    return (
        <div className="group" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <input
                type="number"
                style={{ width: "40%", height: "2rem", borderRadius: "0.7rem", marginRight: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }}
                value={props.amount}
                onChange={(ev) => props.onAmountChange(ev.target.value)}
            />
            <select
                key="uniqueID1"
                style={{ width: "40%", height: "2rem", borderRadius: "0.7rem" }}
                value={props.currency}
                onChange={(ev) => props.onCurrencyChange(ev.target.value)}
            >
                {props.currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
