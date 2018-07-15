import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import CompoundControls from "../../components/Compound/CompoundControls";
import CompoundDisplay from "../../components/Compound/CompoundDisplay";

import { Line } from "react-chartjs-2";

const APP_STORAGE = "compoundCalculatorState";

const PERIOD_ENUMERATION = {
  DAY: {
    func: annualPercentage => {
      return annualPercentage / 365 / 100;
    },
    divisor: 365,
    key: "day"
  },
  WEEK: {
    func: annualPercentage => {
      return annualPercentage / 52 / 100;
    },
    divisor: 52,
    key: "week"
  },
  MONTH: {
    func: annualPercentage => {
      return annualPercentage / 12 / 100;
    },
    divisor: 12,
    key: "month"
  },
  YEAR: {
    func: annualPercentage => {
      return annualPercentage / 100;
    },
    divisor: 1,
    key: "year"
  }
};

const CHART_OPTIONS = {
  xAxisID: "Years",
  yAxisID: "$",
  maintainAspectRatio: true
};

const CHART_LABELS = ["Total", "Invested", "Interest", "Safe Withdrawal"];

class CompoundCalculator extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }

  getStateFromLocalStorageOrDefault = defaultReturn => {
    const stored = JSON.parse(localStorage.getItem(APP_STORAGE));
    return stored === null ? defaultReturn : stored;
  };

  setCookieForApp = state => {
    let cleanState = { ...state };
    cleanState.points = [];
    cleanState.dataSets = [];
    localStorage.setItem(APP_STORAGE, JSON.stringify(cleanState));
  };

  state = this.getStateFromLocalStorageOrDefault({
    yearsToInvest: 10,
    amountToInvest: 10,
    annualReturn: 6,
    additionalType: "MONTH",
    additionalAmount: 0,
    points: [],
    dataSets: {}
  });

  updateGraphHandler(tmpState) {
    let calculatedState = { ...tmpState };
    const calculatedPoints = this.calculatePoints(
      Number(tmpState.yearsToInvest),
      Number(tmpState.amountToInvest),
      Number(tmpState.annualReturn),
      PERIOD_ENUMERATION.YEAR,
      Number(tmpState.additionalAmount) *
        PERIOD_ENUMERATION[tmpState.additionalType].divisor
    );
    calculatedState.points = calculatedPoints;
    calculatedState.dataSets = this.updateDataSets(calculatedPoints);
    this.setState({ ...calculatedState });
    this.setCookieForApp(calculatedState);
  }

  updateYearsToInvestHandler = event => {
    let tmpState = { ...this.state };
    tmpState.yearsToInvest = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAmountToInvestHandler = event => {
    let tmpState = { ...this.state };
    tmpState.amountToInvest = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAnnualReturnHandler = event => {
    let tmpState = { ...this.state };
    tmpState.annualReturn = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAdditionalTypeHandler = event => {
    let tmpState = { ...this.state };
    tmpState.additionalType = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAdditionalAmountHandler = event => {
    let tmpState = { ...this.state };
    tmpState.additionalAmount = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  calculatePoints = (
    yearsToCalculate,
    initialInvestment,
    annualPercentage,
    byEnum,
    additionalInvestmentPerPoint
  ) => {
    let valuePoints = [];
    let futureValue = initialInvestment;
    let investedValue = initialInvestment;
    let interestValue = 0;
    let iterations = yearsToCalculate * byEnum.divisor;
    let rate = byEnum.func(annualPercentage);

    for (let i = 0; i < iterations; i++) {
      futureValue = (futureValue + additionalInvestmentPerPoint) * (1 + rate);
      investedValue += additionalInvestmentPerPoint;
      interestValue = futureValue - investedValue;
      valuePoints.push({
        year: i + 1,
        amount: futureValue,
        invested: investedValue,
        interest: interestValue,
        safeWithdrawal: futureValue * 0.04
      });
    }

    return valuePoints;
  };

  calculatePointsOnlyYearlyCompounding = (
    yearsToCalculate,
    initialInvestment,
    annualPercentage,
    byEnum,
    additionalInvestmentPerPoint
  ) => {
    // calcualte the points by year initially
    let yearlyPoints = this.calculatePoints(
      yearsToCalculate,
      initialInvestment,
      annualPercentage,
      PERIOD_ENUMERATION.YEAR,
      additionalInvestmentPerPoint
    );

    // create new point array to hold intermediate points
    let intermediatePoints = [];

    // short circuit if we want yearly anyways
    if (byEnum === PERIOD_ENUMERATION.YEAR) {
      return yearlyPoints;
    }

    for (let i = 0; i < yearsToCalculate; i++) {
      let start = i === 0 ? initialInvestment : yearlyPoints[i - 1].amount;
      let end = yearlyPoints[i].amount;
      let difference = end - start;
      let perIteration = difference / byEnum.divisor;

      for (let j = 1; j <= byEnum.divisor; j++) {
        intermediatePoints.push({ year: i, amount: start + perIteration * j });
      }
    }

    return intermediatePoints;
  };

  updateDataSets = points => {
    let totalAmount = [];
    let totalColor = "rgba(0, 0, 0, 1)";
    let investedTotal = [];
    let investedColor = "rgba(63, 191, 63, 1)";
    let interestTotal = [];
    let iterestColor = "rgba(63, 191, 191, 1)";
    let safeWithdrawal = [];
    let safeWithdrawalColor = "rgba(191, 191, 63, 1)";
    let labels = [];

    for (let i = 0; i < points.length; i++) {
      totalAmount.push({ y: points[i].amount.toFixed(2), x: i + 1 });
      investedTotal.push({ y: points[i].invested, x: i + 1 });
      interestTotal.push({ y: points[i].interest, x: i + 1 });
      safeWithdrawal.push({ y: points[i].safeWithdrawal, x: i + 1 });
      labels.push(i + 1 + "");
    }

    return {
      labels: labels,
      datasets: [
        this.toDataSet("Total", totalColor, totalAmount),
        this.toDataSet("Invested", investedColor, investedTotal),
        this.toDataSet("Interest", iterestColor, interestTotal),
        this.toDataSet("Safe Withdrawal", safeWithdrawalColor, safeWithdrawal)
      ]
    };
  };

  toDataSet = (label, color, data) => {
    return {
      label: label,
      borderColor: color,
      data: data,
      fill: false
    };
  };

  componentWillMount() {
    if (this.state.points.length === 0) {
      this.updateGraphHandler(this.state);
    }
  }

  render() {
    return (
      <Auxiliary>
        <CompoundControls
          yearsToInvest={this.state.yearsToInvest}
          yearsToInvestHandler={this.updateYearsToInvestHandler}
          amountToInvest={this.state.amountToInvest}
          amountToInvestHandler={this.updateAmountToInvestHandler}
          annualReturn={this.state.annualReturn}
          annualReturnHandler={this.updateAnnualReturnHandler}
          additionalType={this.state.additionalType}
          additionalTypeHandler={this.updateAdditionalTypeHandler}
          additionalAmount={this.state.additionalAmount}
          additionalAmountHandler={this.updateAdditionalAmountHandler}
        />
        <CompoundDisplay calculatedPoints={this.state.points} />
        <Line
          // labels={CHART_LABELS}
          data={this.state.dataSets}
          options={CHART_OPTIONS}
          width={500}
          height={100}
        />
      </Auxiliary>
    );
  }
}

export default CompoundCalculator;
