import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Compound Interest Calculator
    </NavigationItem>
    <NavigationItem link="/">Nothing Yet</NavigationItem>
  </ul>
);

export default navigationItems;
