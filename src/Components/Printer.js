import React, { Component } from 'react';

class Printer extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            id: props.id,
            name: props.name,
            status: props.status,
            ip_address: props.ip_address
        };
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async update() {
        const { onUpdate } = this.props;

        const input = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            ip_address: this.state.ip_address
        }

        console.log(input);

        try {
            await onUpdate({ input })
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
                <button onClick={this.update}>
                    Update
            </button>
            </div>
        );
    }
}

export default Printer;