import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import CompoundControls from "../../components/Compound/CompoundControls";
import CompoundDisplay from "../../components/Compound/CompoundDisplay";

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

class CompoundCalculator extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    yearsToInvest: 10,
    amountToInvest: 10,
    annualReturn: 6,
    additionalType: "MONTH",
    additionalAmount: 0,
    points: []
  };

  updateGraphHandler(tmpState) {
    console.log("hit update graph handler");
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
    this.setState({ ...calculatedState });
  }

  updateYearsToInvestHandler = event => {
    console.log("hit update yearsToInvest");
    let tmpState = { ...this.state };
    tmpState.yearsToInvest = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAmountToInvestHandler = event => {
    console.log("hit update amountToInvest: " + event.target.value);
    let tmpState = { ...this.state };
    tmpState.amountToInvest = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAnnualReturnHandler = event => {
    console.log("hit update annualReturn");
    let tmpState = { ...this.state };
    tmpState.annualReturn = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAdditionalTypeHandler = event => {
    console.log("hit update additionalType");
    let tmpState = { ...this.state };
    tmpState.additionalType = event.target.value;
    this.updateGraphHandler(tmpState);
  };

  updateAdditionalAmountHandler = event => {
    console.log("hit update additionalType: " + event.target.value);
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
      </Auxiliary>
    );
  }
}

export default CompoundCalculator;
