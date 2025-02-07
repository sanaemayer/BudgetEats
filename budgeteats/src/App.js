import React, { Component } from "react";
import NavigationBar from "./components/navigationBar";
import Ingredient from "./components/ingredient";
import Homepage from "./components/homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <NavigationBar />
      </header>
      <main>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/ingredients">
                <Ingredient />
              </Route>
            </Switch>
          </React.Fragment>
        </Router>
      </main>
    </div>
  );
}

export default App;
