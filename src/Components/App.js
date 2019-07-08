import React from 'react';
import '../Styles/App.css';
import PrinterList from './PrinterList';
import awsconfig from "../aws-exports";
import Amplify from 'aws-amplify';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <PrinterList />
    </div>
  );
}

export default App;
