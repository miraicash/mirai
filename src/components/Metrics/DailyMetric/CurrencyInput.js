import React from 'react';
import PropTypes from "prop-types";

function CurrencyInput(props) {
    return(
        <div className="group">
            <input type="test" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} />
            <select key="uniqueID1" value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)} >
                {props.currencies.map((currency => (
                    <option key={currency} value={currency}>{currency}</option>
                )))}
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