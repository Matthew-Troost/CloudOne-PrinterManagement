import React from 'react';
import '../Styles/App.css';
import AllPrinters from '../Pages/AllPrinters';
import ModifyPrinter from '../Pages/ModifyPrinter';
import NewPrinter from '../Pages/NewPrinter';
import Amplify from 'aws-amplify';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const config = {
  "aws_project_region": "us-east-2",
  "aws_appsync_graphqlEndpoint": "https://w6rye2z6ejfdjfesk4hyscjfqa.appsync-api.us-east-2.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-2",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-fbhl5xhybzfifhbuai6n3vvwlq"
};

Amplify.configure(config);

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
