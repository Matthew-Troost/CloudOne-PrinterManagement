import React, { Component } from 'react';

class Printer extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            id: props.id,
            name: props.name
        };
    }

    handleChange(name, event) {
        this.setState({ [name]: event.target.value });
    }

    async update() {
        const { onUpdate } = this.props;

        const input = {
            id: this.state.id,
            name: this.state.name
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
                <button onClick={this.update}>
                    Update
            </button>
            </div>
        );
    }
}

export default Printer;