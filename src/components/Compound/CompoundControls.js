import React from "react";

import classes from "./CompoundControls.css";

const compoundControls = props => (
  <div className={classes.CompoundControls}>
    <div>
      <label className={classes.ControlsLeft} htmlFor="initial-investment">
        Amount To Invest: $
      </label>
      <input
        className={classes.ControlsLeft}
        id="initial-investment"
        name="initial-investment"
        value={props.amountToInvest}
        type="number"
        onChange={props.amountToInvestHandler}
      />
    </div>
    <div>
      <label className={classes.ControlsLeft} htmlFor="annual-return">
        Annual Return:{" "}
      </label>
      <input
        className={classes.ControlsLeft}
        id="annual-return"
        name="annual-return"
        defaultValue={props.annualReturn}
        type="number"
        onChange={props.annualReturnHandler}
      />%
    </div>
    <div>
      <label className={classes.ControlsLeft} htmlFor="years-to-invest">
        Years To Invest
      </label>
      <input
        className={classes.ControlsLeft}
        id="years-to-invest"
        name="years-to-invest"
        defaultValue={props.yearsToInvest}
        type="number"
        onChange={props.yearsToInvestHandler}
      />
    </div>
    <div>
      <label className={classes.ControlsLeft} htmlFor="periodic-investment">
        Periodic Investment $
      </label>
      <input
        className={classes.ControlsLeft}
        id="periodic-investment"
        name="periodic-investment"
        defaultValue={props.additionalAmount}
        type="number"
        onChange={props.additionalAmountHandler}
      />
      <select
        id="periodic-type"
        onChange={props.additionalTypeHandler}
        defaultValue={props.additionalType}
      >
        <option value="YEAR">Yearly</option>
        <option value="MONTH">Monthly</option>
        <option value="WEEK">Weekly</option>
        <option value="DAY">Daily</option>
      </select>
    </div>
  </div>
);

export default compoundControls;
