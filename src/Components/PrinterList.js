import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { Link } from 'react-router-dom';
import '../Styles/Custom.css';
import loader from '../Assets/loading.gif';

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

            this.FetchPrinters();
        }
    }

    async FetchPrinters() {

        this.setState({ loading: true });

        const allPrinters = await API.graphql(graphqlOperation(queries.listPrinters));

        this.setState({
            printers: allPrinters.data.listPrinters.items,
            loading: false
        });
    }

    render() {
        if (this.state.loading) { return (<img alt="Loading printers..." src={loader}/>); }
        return (
            <div>
                {this.state.printers.map(printer =>
                    <div className="block" key={printer.id}>
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
        );
    }
}

export default PrinterList;