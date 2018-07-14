import React from "react";

import classes from "./CompoundControls.css";

const compoundDisplay = props => (
  <div className={classes.CompoundControls}>
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.calculatedPoints.map(point => (
          <tr key={point.year}>
            <td>{point.year}</td>
            <td>${point.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default compoundDisplay;
