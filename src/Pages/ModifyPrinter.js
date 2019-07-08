import React, { Component } from "react";
import Printer from '../Components/Printer';
import * as mutations from '../graphql/mutations';
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { Link } from 'react-router-dom';

class ModifyPrinter extends Component {
    render() {
        const { params } = this.props.match
        return (
            <Connect query={graphqlOperation(queries.getPrinter, { id: params.id })}>
                {({ data: { getPrinter }, loading, error }) => {
                    if (error) return (<h3>Error</h3>);
                    if (loading || !getPrinter) return (<h3>Fetching...</h3>);
                    return (
                        <div>
                            <Connect mutation={graphqlOperation(mutations.updatePrinter)} key={getPrinter.id}>
                                {({ mutation }) => (
                                    <Printer id={getPrinter.id} name={getPrinter.name} status={getPrinter.status} ip_address={getPrinter.ip_address} onUpdate={mutation} />
                                )}
                            </Connect>
                            <Link to="/">
                                <button>Back</button>
                            </Link>
                        </div>
                    );
                }}
            </Connect>
        );
    }
}

export default ModifyPrinter;