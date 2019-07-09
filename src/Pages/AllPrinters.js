import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PrinterList from '../Components/PrinterList';

class AllPrinters extends Component {
    render() {
        return (
            <div>
                <Link to="/New">
                    <button className="btn btn-rounded">Add New Printer</button>
                </Link>
                <PrinterList />
            </div>
        );
    }
}

export default AllPrinters;