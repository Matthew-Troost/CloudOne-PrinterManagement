import React, { Component } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { Connect } from "aws-amplify-react";
import Printer from './Printer';


class PrinterList extends Component {
    ListTodos = async () => {
        const allPrinters = await API.graphql(graphqlOperation(queries.listPrinters));
        console.log(allPrinters);
    }

    render() {
        return (
            <Connect
                query={graphqlOperation(queries.listPrinters)}
                subscription={graphqlOperation(subscriptions.onCreatePrinter)}
                onSubscriptionMsg={(prev, { onCreatePrinter }) => {
                    console.log(onCreatePrinter);
                    return prev;
                }}
            >
                {({ data: { listPrinters }, loading, error }) => {
                    if (error) return (<h3>Error</h3>);
                    if (loading || !listPrinters) return (<h3>Loading...</h3>);
                    return (
                        <div>
                            <h3>All Primters</h3>
                            <ul>
                                {listPrinters.items.map(printer =>
                                    <Connect mutation={graphqlOperation(mutations.updatePrinter)} key={printer.id}>
                                        {({ mutation }) => (
                                            <Printer id={printer.id} name={printer.name} onUpdate={mutation} />
                                        )}
                                    </Connect>
                                )}
                            </ul>
                        </div>
                    );
                }}
            </Connect>
        );
    }
}

export default PrinterList;