import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./pages/settings/Settings";
import URLs from "./libs/urls";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={URLs.Settings} component={Settings} />
          <Route exact path={URLs.Main} component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
