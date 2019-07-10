import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';
import { Link } from 'react-router-dom';

class NewPrinter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: '',
            ip_address: '',
            creating: false
        };
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async create() {
        this.setState({ creating: true });

        const input = {
            name: this.state.name,
            status: this.state.status,
            ip_address: this.state.ip_address
        }

        try {
            await API.graphql(graphqlOperation(mutations.createPrinter, { input: input }));
            window.alert('Success!');
            this.props.history.push("/");
        } catch (err) {
            window.alert('Please ensure all fields are captured...');
            this.setState({ creating: false });
        }
    }

    render() {
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
                <button onClick={() => this.create()} className="btn btn-small btn-square">{this.state.creating ? 'Creating...' : 'Create'}</button>
                <Link to="/">
                    <button className="btn btn-small btn-square btn-default"> Back </button>
                </Link>
            </div>
        );
    }
}

export default NewPrinter;