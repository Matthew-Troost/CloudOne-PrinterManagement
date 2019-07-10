import React, { Component } from "react";
import * as mutations from '../graphql/mutations';
import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { Link } from 'react-router-dom';
import loader from '../Assets/loading.gif';

class ModifyPrinter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            status: props.status,
            ip_address: props.ip_address,
            loading: true
        };
    }

    componentDidMount() {
        this.FetchPrinter();
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async FetchPrinter() {
        const { params } = this.props.match;
        const response = await API.graphql(graphqlOperation(queries.getPrinter, { id: params.id }));
        const printer = response.data.getPrinter;

        this.setState({
            id: printer.id,
            name: printer.name,
            status: printer.status,
            ip_address: printer.ip_address,
            loading: false,
            updating: false
        });
    }

    async UpdatePrinter() {

        this.setState({ updating: true });

        const input = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            ip_address: this.state.ip_address
        }

        await API.graphql(graphqlOperation(mutations.updatePrinter, { input: input }));

        this.setState({ updating: false }, () => window.alert("Successfully Updated!"));
    }

    render() {
        if (this.state.loading) { return (<img alt="Fetching printer..." src={loader} />); }

        return (
            <div className="input-box">
                <input
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(event) => { this.handleChange('name', event) }}
                />
                <input
                    name="status"
                    placeholder="Status (Active/Inactive)"
                    value={this.state.status}
                    onChange={(event) => { this.handleChange('status', event) }}
                />
                <input
                    name="ip_address"
                    placeholder="IP Address"
                    value={this.state.ip_address}
                    onChange={(event) => { this.handleChange('ip_address', event) }}
                />
                <button onClick={() => this.UpdatePrinter()} className="btn btn-small btn-square"> {this.state.updating ? 'Updating...' : 'Update'} </button>
                <Link to="/">
                    <button className="btn btn-small btn-square btn-default"> Back </button>
                </Link>
            </div>
        );
    }
}

export default ModifyPrinter;