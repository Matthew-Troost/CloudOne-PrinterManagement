import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { Connect } from "aws-amplify-react";
import { Link } from 'react-router-dom';
import '../Styles/Custom.css';

class PrinterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            printers: [],
            loading: true
        };
    }

    componentDidMount() {
        this.FetchPrinters();
    }

    async DeletePrinter(id) {
        if (window.confirm('Are you sure you wish to delete this printer?')) {
            const input = {
                id: id
            }
            await API.graphql(graphqlOperation(mutations.deletePrinter, { input: input }));
        }
    }

    async FetchPrinters() {
        const allPrinters = await API.graphql(graphqlOperation(queries.listPrinters));
        this.setState({
            printers: allPrinters.data.listPrinters.items,
            loading: false
        });
    }

    render() {
        if (this.state.loading) { return (<h3>Loading Printers...</h3>); }
        return (
            // <Connect
            //     query={graphqlOperation(queries.listPrinters)}
            //     subscription={graphqlOperation(subscriptions.onCreatePrinter)}
            //     onSubscriptionMsg={(prev, { onCreatePrinter }) => {
            //         console.log(onCreatePrinter);
            //         return prev;
            //     }}
            // >
            //     {({ data: { listPrinters }, loading, error }) => {
            //         if (error) return (<h3>Error</h3>);
            //     if (loading || !listPrinters) return (<h3>Loading...</h3>);
            // return (
            <div>
                {this.state.printers.map(printer =>
                    <div className="block">
                        <h2>{printer.name}</h2>
                        <p>{printer.ip_address}</p>
                        <p>
                            <span className={"dot " + (printer.status === 'active' ? 'dot-active' : '')}></span> {printer.status.toUpperCase()}
                        </p>
                        <Link key={printer.id} to={`/modify/${printer.id}`}>
                            <button className="btn btn-square btn-small">Edit</button>
                        </Link>
                        <button className="btn btn-square btn-small btn-error" onClick={() => this.DeletePrinter(printer.id)}>Delete</button>
                    </div>
                )}
            </div>
            //   );
            // }}
            // </Connect>

        );
    }
}

export default PrinterList;