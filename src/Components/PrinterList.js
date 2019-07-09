import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { Connect } from "aws-amplify-react";
import { Link } from 'react-router-dom';
import '../Styles/Custom.css';

class PrinterList extends Component {

    async DeletePrinter(id) {
        if (window.confirm('Are you sure you wish to delete this printer?')) {
            const input = {
                id: id
            }
            await API.graphql(graphqlOperation(mutations.deletePrinter, { input: input }));
        }
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
                            <Link to="/New">
                                <button className="btn">Create New</button>
                            </Link>
                            {listPrinters.items.map(printer =>
                                <div className="block">
                                    <h5>{printer.name}</h5>
                                    <Link key={printer.id} to={`/modify/${printer.id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button onClick={() => this.DeletePrinter(printer.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    );
                }}
            </Connect>

        );
    }
}

export default PrinterList;