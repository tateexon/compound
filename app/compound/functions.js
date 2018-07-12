let Functions = {};

/**
 * By functions to calculate percentages for sub year increments
 * @param {int} annualPercentage
 */
Functions.byDay = function(annualPercentage) {
  return annualPercentage / 365 / 100;
};

Functions.byWeek = function(annualPercentage) {
  return annualPercentage / 52 / 100;
};

Functions.byMonth = function(annualPercentage) {
  return annualPercentage / 12 / 100;
};

Functions.byYear = function(annualPercentage) {
  return annualPercentage / 100;
};

/**
 * An enumeration to help determine what to use in calculations
 */
const ByEnum = {
  DAY: {
    func: Functions.byDay,
    divisor: 365,
    key: "day"
  },
  WEEK: {
    func: Functions.byWeek,
    divisor: 52,
    key: "week"
  },
  MONTH: {
    func: Functions.byMonth,
    divisor: 12,
    key: "month"
  },
  YEAR: {
    func: Functions.byYear,
    divisor: 1,
    key: "year"
  }
};

/**
 * Calculate plot points for investments
 * @param {int} yearsToCalculate
 * @param {float} initialInvestment
 * @param {float} annualPercentage
 * @param {ByEnum} byEnum
 * @param {float} additionalInvestmentPerPoint
 */
Functions.calculatePoints = function(
  yearsToCalculate,
  initialInvestment,
  annualPercentage,
  byEnum,
  additionalInvestmentPerPoint
) {
  let valuePoints = [];
  let futureValue = initialInvestment;
  let iterations = yearsToCalculate * byEnum.divisor;
  let rate = byEnum.func(annualPercentage);

  for (let i = 0; i < iterations; i++) {
    futureValue = (futureValue + additionalInvestmentPerPoint) * (1 + rate);
    valuePoints.push(futureValue);
  }

  return valuePoints;
};

Functions.calculatePointsOnlyYearlyCompounding = function(
  yearsToCalculate,
  initialInvestment,
  annualPercentage,
  byEnum,
  additionalInvestmentPerPoint
) {
  // calcualte the points by year initially
  let yearlyPoints = Functions.calculatePoints(
    yearsToCalculate,
    initialInvestment,
    annualPercentage,
    ByEnum.YEAR,
    additionalInvestmentPerPoint
  );

  // create new point array to hold intermediate points
  let intermediatePoints = [];

  // short circuit if we want yearly anyways
  if (byEnum === ByEnum.YEAR) {
    return yearlyPoints;
  }

  for (let i = 0; i < yearsToCalculate; i++) {
    let start = i === 0 ? initialInvestment : yearlyPoints[i - 1];
    let end = yearlyPoints[i];
    let difference = end - start;
    let perIteration = difference / byEnum.divisor;

    for (let j = 1; j <= byEnum.divisor; j++) {
      intermediatePoints.push(start + perIteration * j);
    }
  }

  return intermediatePoints;
};

/**
 * Print a single point value to the screen
 * @param {ByEnum} byEnum
 * @param {int} point
 * @param {float} amount
 */
Functions.printPoint = function(byEnum, point, amount) {
  return (
    "Total after " +
    point +
    " " +
    byEnum.key +
    (point === 1 ? "" : "s") +
    ": $" +
    amount
  );
};

/**
 * Print all the point in the array to the screen
 * @param {ByEnum} byEnum
 * @param {Array} points
 */
Functions.printPoints = function(byEnum, points) {
  for (let i = 0; i < points.length; i++) {
    console.log(functions.printPoint(byEnum, i + 1, points[i]));
  }
};
