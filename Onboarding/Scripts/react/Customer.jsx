import React, { Component} from 'react';
import ReactDOM from 'react-dom';


export default class ListingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            customerList: []
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //ajax call logic
    }
    update(id) {
        //ajax call logic
    }

    delete(id) {
        //ajax call logic
    }

    render() {

        let customerList = this.state.customerList;

        let tableData = null;

        if (customerList != "") {
            tableData = customerList.map(customer =>
                <tr key={customer.id}>
                    <td className="four wide">{service.name}</td>
                    <td className="four wide">{service.adress}</td>
                    <td className="four wide">
                        <i className="outline write icon" onClick={this.update.bind(this, service.id)}></i>
                    </td>
                    <td>
                        <i className="remove icon" onClick={this.delete.bind(this, service.id)}></i>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div style={{ margin: '10px 0' }}>
                    <button className="huge ui primary button">
                        New Customer
                    </button>
                </div>
                <div>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="four wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="four wide">Actions</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

var customerView = document.getElementById("customerView");
ReactDOM.render(<ListingTable />, customerView);