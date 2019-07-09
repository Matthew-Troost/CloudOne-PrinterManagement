import React from 'react';
import '../Styles/App.css';
import AllPrinters from '../Pages/AllPrinters';
import ModifyPrinter from '../Pages/ModifyPrinter';
import NewPrinter from '../Pages/NewPrinter';
import awsconfig from "../aws-exports";
import Amplify from 'aws-amplify';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrinterList from './PrinterList';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Printer Management</h1>
        <Switch>
          <Route exact path="/" component={AllPrinters} />
          <Route path="/Modify/:id" component={ModifyPrinter} />
          <Route path="/New" component={NewPrinter} />
          <Route render={() => <h1>Whoops.. Page not found :(</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
