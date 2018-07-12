let CompoundModule = {
  initialInvestment: "initial-investment",
  initialInvestmentError: "initial-investment-error",
  annualReturn: "annual-return",
  yearsToInvest: "years-to-invest",
  periodicContribution: "periodic-investment",
  periodicType: "periodic-type"
};

CompoundModule.calculateFromPage = function() {
  let initialInvestment = Number(
    document.getElementById(CompoundModule.initialInvestment).value
  );

  if (
    initialInvestment === "" ||
    initialInvestment === null ||
    initialInvestment === NaN
  ) {
    initialInvestment = 0;
  }

  let annualReturn = Number(
    document.getElementById(CompoundModule.annualReturn).value
  );

  let yearsToInvest = Number(
    document.getElementById(CompoundModule.yearsToInvest).value
  );

  let periodicContribution = Number(
    document.getElementById(CompoundModule.periodicContribution).value
  );

  let periodicType =
    ByEnum[document.getElementById(CompoundModule.periodicType).value];

  periodicContribution = periodicContribution * periodicType.divisor;

  let plotPoints = Functions.calculatePointsOnlyYearlyCompounding(
    yearsToInvest,
    initialInvestment,
    annualReturn,
    periodicType,
    periodicContribution
  );

  // clear the div before reprinting it
  let returnDiv = document.getElementById("expected-returns");
  returnDiv.innerHTML = "";

  for (let i = 0; i < plotPoints.length; i++) {
    let div = document.createElement("div");
    div.textContent = Functions.printPoint(periodicType, i + 1, plotPoints[i]);
    returnDiv.appendChild(div);
  }
};
