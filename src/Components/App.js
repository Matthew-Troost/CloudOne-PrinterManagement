import React from 'react';
import '../Styles/App.css';
import AllPrinters from '../Pages/AllPrinters';
import ModifyPrinter from '../Pages/ModifyPrinter';
import NewPrinter from '../Pages/NewPrinter';
import awsconfig from "../aws-exports";
import Amplify from 'aws-amplify';
import { Route, BrowserRouter as Router } from 'react-router-dom';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={AllPrinters} />
        <Route path="/Modfiy" component={ModifyPrinter} />
        <Route path="/New" component={NewPrinter} />
      </div>
    </Router>
  );
}

export default App;
