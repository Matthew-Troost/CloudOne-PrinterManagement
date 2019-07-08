import React, { Component } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../GraphQL/queries';


class PrinterList extends Component {
    ListTodos = async () => {
        // const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
        // console.log(allTodos);
    }

    render() {
        return (
            <button onClick={this.ListTodos}>testing</button>
        );
    }
}

export default PrinterList;