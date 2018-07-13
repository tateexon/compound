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

  // let annualReturn = Number(
  //   document.getElementById(CompoundModule.annualReturn).value
  // );

  let yearsToInvest = Number(
    document.getElementById(CompoundModule.yearsToInvest).value
  );

  // let periodicContribution = Number(
  //   document.getElementById(CompoundModule.periodicContribution).value
  // );

  // let periodicType =
  //   ByEnum[document.getElementById(CompoundModule.periodicType).value];

  // periodicContribution = periodicContribution * periodicType.divisor;

  // let plotPoints = Functions.calculatePointsOnlyYearlyCompounding(
  //   yearsToInvest,
  //   initialInvestment,
  //   annualReturn,
  //   periodicType,
  //   periodicContribution
  // );

  // clear the div before reprinting it
  // let returnDiv = document.getElementById("expected-returns");
  // returnDiv.innerHTML = "";

  // for (let i = 0; i < plotPoints.length; i++) {
  //   let div = document.createElement("div");
  //   div.textContent = Functions.printPoint(periodicType, i + 1, plotPoints[i]);
  //   returnDiv.appendChild(div);
  // }

  let percentage1 = 2;
  let percentage2 = 6;
  let percentage3 = 10;

  let plotPoints1 = Functions.calculatePoints(
    yearsToInvest,
    initialInvestment,
    percentage1,
    ByEnum.YEAR,
    0
  );
  let plotPoints2 = Functions.calculatePoints(
    yearsToInvest,
    initialInvestment,
    percentage2,
    ByEnum.YEAR,
    0
  );
  let plotPoints3 = Functions.calculatePoints(
    yearsToInvest,
    initialInvestment,
    percentage3,
    ByEnum.YEAR,
    0
  );

  let myData = [];
  myData.push({ team: "A", point: 0, amount: 0 });
  myData.push({ team: "B", point: 0, amount: 0 });
  myData.push({ team: "C", point: 0, amount: initialInvestment });
  // build data array
  for (let i = 0; i < plotPoints1.length; i++) {
    myData.push({
      team: "A",
      point: i + 1,
      amount: plotPoints3[i] - plotPoints2[i]
    });
    myData.push({
      team: "B",
      point: i + 1,
      amount: plotPoints2[i] - plotPoints1[i]
    });
    myData.push({
      team: "C",
      point: i + 1,
      amount: plotPoints1[i]
    });
  }

  let myChart = document.getElementById("target");
  myChart.innerHTML = "";

  new Taucharts.Chart({
    type: "stacked-area",
    x: "point",
    y: "amount",
    color: "team",
    guide: {
      interpolate: "smooth-keep-extremum",
      brewer: {
        A: "#ff0000", // red
        B: "#0000ff", // blue
        C: "#00ff00" //"#00ff00" // black
      }
    },
    data: myData
    // data: [
    //   { team: "Alpha", date: "2015-07-15", effort: 400 },
    //   { team: "Alpha", date: "2015-07-16", effort: 200 },
    //   { team: "Alpha", date: "2015-07-17", effort: 300 },
    //   { team: "Alpha", date: "2015-07-18", effort: 500 },
    //   { team: "Beta", date: "2015-07-15", effort: 100 },
    //   { team: "Beta", date: "2015-07-16", effort: 200 },
    //   { team: "Beta", date: "2015-07-17", effort: 300 },
    //   { team: "Beta", date: "2015-07-18", effort: 100 },
    //   { team: "Gamma", date: "2015-07-15", effort: 300 },
    //   { team: "Gamma", date: "2015-07-16", effort: 100 },
    //   { team: "Gamma", date: "2015-07-17", effort: 100 },
    //   { team: "Gamma", date: "2015-07-18", effort: 200 }
    // ]
  }).renderTo("#target");
};
