import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
//Pages
import WinPage from "./pages/winPage";
import LoosePage from "./pages/losePage";
//Components
import GameCard from "./components/GameCard";
//MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: "30%",
    margin: "100px auto",
    padding: "0px 20px 20px",
    background: "#fff",
    borderRadius: "5px",
    fontFamily: "Roboto, sans-serif"
  }
}));
function App(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {props.win ? <Redirect to="/win" /> : <GameCard />}
            {props.lose ? <Redirect to="/lose" /> : null}
          </Route>
          <Route path="/win">
            <WinPage coincidences={props.coincidences} />
          </Route>
          <Route path="/lose">
            <LoosePage coincidences={props.coincidences} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    win: state.win,
    coincidences: state.coincidences,
    lose: state.lose
  };
};

export default connect(mapStateToProps)(App);

{
  /* <Router>
      <Route path="/" exact>
        {fr ? <Redirect to="/win" /> : <Redirect to="/lose" />}
      </Route>
       
    </Router>

 */
}
