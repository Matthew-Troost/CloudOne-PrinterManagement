import React, { Component } from "react";
import { graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { Connect } from "aws-amplify-react";
import Printer from './Printer';
import { Link } from 'react-router-dom';

class PrinterList extends Component {

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
                            <h3>All Printers</h3>
                            <ul>
                                {listPrinters.items.map(printer =>
                                    <div>
                                        <h5>{printer.name}</h5>
                                        <Link key={printer.id} to={`/modify/${printer.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                        <button>Delete</button>
                                    </div>
                                    // <Printer id={printer.id} name={printer.name} status={printer.status} ip_address={printer.ip_address} onUpdate={mutation} />
                                )}
                            </ul>
                        </div>
                    );
                }}
            </Connect>

            //display a list here and test if live updates work 



        );
    }
}

export default PrinterList;