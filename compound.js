/**
 * By functions to calculate percentages for sub year increments
 * @param {int} annualPercentage 
 */
function byDay(annualPercentage) {
  return annualPercentage / 365 / 100;
}

function byWeek(annualPercentage) {
  return annualPercentage / 52 / 100;
}

function byMonth(annualPercentage) {
  return annualPercentage / 12 / 100;
}

function byYear(annualPercentage) {
  return annualPercentage / 100;
}

/**
 * An enumeration to help determine what to use in calculations
 */
const ByEnum = {
  DAY: {
    func: byDay,
    divisor: 365,
    key: "day"
  },
  WEEK: {
    func: byWeek,
    divisor: 52,
    key: "week"
  },
  MONTH: {
    func: byMonth,
    divisor: 12,
    key: "month"
  },
  YEAR: {
    func: byYear,
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
function calculatePoints(
  yearsToCalculate,
  initialInvestment,
  annualPercentage,
  byEnum,
  additionalInvestmentPerPoint
) {
  let valuePoints = [];
  //valuePoints.push(initialInvestment);
  let futureValue = initialInvestment;
  let iterations = yearsToCalculate * byEnum.divisor;
  let rate = byEnum.func(annualPercentage);

  for (let i = 0; i < iterations; i++) {
    futureValue = (futureValue + additionalInvestmentPerPoint) * (1 + rate);
    valuePoints.push(futureValue);
  }

  return valuePoints;
}

function calculatePointsOnlyYearlyCompounding(
  yearsToCalculate,
  initialInvestment,
  annualPercentage,
  byEnum,
  additionalInvestmentPerPoint
) {
  // calcualte the points by year initially
  let yearlyPoints = calculatePoints(
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

    //intermediatePoints.push(start);

    for (let j = 1; j <= byEnum.divisor; j++) {
      intermediatePoints.push(start + perIteration * j);
    }
  }

  return intermediatePoints;
}

/**
 * Print a single point value to the screen
 * @param {ByEnum} byEnum 
 * @param {int} point 
 * @param {float} amount 
 */
function printPoint(byEnum, point, amount) {
  console.log(
    "Total after " +
      point +
      " " +
      byEnum.key +
      (point === 1 ? "" : "s") +
      ": $" +
      amount
  );
}

/**
 * Print all the point in the array to the screen
 * @param {ByEnum} byEnum 
 * @param {Array} points 
 */
function printPoints(byEnum, points) {
  for (let i = 0; i < points.length; i++) {
    printPoint(byEnum, i + 1, points[i]);
  }
}

// Usage Example
let investment = 1000;
let annualRate = 7;
let years = 10;
let yearlyContributions = 0;
let by = ByEnum.MONTH;

let myPoints = calculatePointsOnlyYearlyCompounding(
  years,
  investment,
  annualRate,
  by,
  yearlyContributions
);
printPoints(by, myPoints);

myPoints = calculatePoints(
  years,
  investment,
  annualRate,
  ByEnum.YEAR,
  yearlyContributions
);
printPoints(ByEnum.YEAR, myPoints);
