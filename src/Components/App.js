import React from 'react';
import '../Styles/App.css';
import AllPrinters from '../Pages/AllPrinters';
import ModifyPrinter from '../Pages/ModifyPrinter';
import awsconfig from "../aws-exports";
import Amplify from 'aws-amplify';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AllPrinters} />
          <Route path="/Modify/:id" component={ModifyPrinter} />
          <Route render={() => <h1>Whoops.. Page not found :(</h1>} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
