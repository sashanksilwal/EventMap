import "./App.css";
import Home from "./containers/home.js";
import Event from "./containers/event";
import Footer from "./components/footer";
import TopBar from "./components/topBar";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { grey, green } from "@material-ui/core/colors";
import "fontsource-roboto";

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
      <Event id={match.params.id} />
      <Footer />
    </>
  );
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/events/:id" component={EventWrapper} />
          <Route path="/">
            <TopBar />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
