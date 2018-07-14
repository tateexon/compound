import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import CompoundCalculator from "./containers/CompoundCalculator/CompoundCalculator";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <CompoundCalculator />
        </Layout>
      </div>
    );
  }
}

export default App;
