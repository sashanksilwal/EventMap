import React from "react";
import { AppBar } from "@material-ui/core";
import ToolBar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
function TopBar(props) {
  return (
    <AppBar position="sticky">
      <nav className="Navigation">
        <ToolBar>
          <Link to="/?location=AU&country=Australia"> Australia</Link>
          <Link to="/?location=CA&country=Canada"> Canada</Link>
          <Link to="/?location=US&country=United%20States"> US</Link>
          <Link to="/?location=DE&country=Germany"> Germany</Link>
          <Link to="/?location=ES&country=Spain"> Spain</Link>
        </ToolBar>
      </nav>
    </AppBar>
  );
}

export default TopBar;
