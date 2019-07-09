import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

class NewPrinter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: '',
            ip_address: ''
        };
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async create() {
        const input = {
            name: this.state.name,
            status: this.state.status,
            ip_address: this.state.ip_address
        }

        try {
            await API.graphql(graphqlOperation(mutations.createPrinter, { input: input }));
            window.alert('Success!');
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div>
                <input
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={(event) => { this.handleChange('name', event) }}
                />
                <input
                    name="status"
                    placeholder="status"
                    value={this.state.status}
                    onChange={(event) => { this.handleChange('status', event) }}
                />
                <input
                    name="ip_address"
                    placeholder="ip_address"
                    value={this.state.ip_address}
                    onChange={(event) => { this.handleChange('ip_address', event) }}
                />
                <button onClick={() => this.create()}>Create</button>
            </div>
        );
    }
}

export default NewPrinter;