import "./App.css";
import Home from "./containers/home.js";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { grey, green } from "@material-ui/core/colors";
import "fontsource-roboto";
import TopBar from "./components/topBar";
import Event from "./containers/event";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: green[400],
    },
  },
});
const EventWrapper = ({ match }) => {
  return (
    <>
      <TopBar />
      <Event eventName="hello" />
      {/* <Event eventInfo={match} /> */}
    </>
  );
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/?location=">
            <Home />
          </Route>
          <Route path="/event/:id" component={EventWrapper} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
