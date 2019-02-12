import React from "react";

import classes from "./CompoundControls.css";

const compoundDisplay = props => (
  <div className={classes.CompoundControls}>
    <table className={classes.TableBorder}>
      <thead>
        <tr>
          <th className={classes.TableData}>Year</th>
          <th className={classes.TableData}>Total Amount</th>
          <th className={classes.TableData}>Invested Total</th>
          <th className={classes.TableData}>Interest Total</th>
          <th className={classes.TableData}>4% Withdrawal</th>
          <th className={classes.TableData}>Yearly Expenses</th>
        </tr>
      </thead>
      <tbody>
        {props.calculatedPoints.map(point => (
          <tr key={point.year}>
            <td className={classes.TableData}>{point.year}</td>
            <td className={classes.TableData}>${point.amount.toFixed(2)}</td>
            <td className={classes.TableData}>${point.invested.toFixed(2)}</td>
            <td className={classes.TableData}>${point.interest.toFixed(2)}</td>
            <td className={classes.TableData}>
              ${point.safeWithdrawal.toFixed(2)}
            </td>
            <td className={classes.TableData}>
              ${point.yearlyExpenses.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default compoundDisplay;
