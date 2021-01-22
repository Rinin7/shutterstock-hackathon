import React from "react";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={(routerProps) => <HomePage {...routerProps} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
