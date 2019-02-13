import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Modal } from 'semantic-ui-react';

export class SaleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleList: [],
            customerList: [],
            productList: [],
            storeList: [],
            deleteModalOpen: false,
            editModalOpen: false,
            createModalOpen: false,
            customer: '',
            product: '',
            store: '',
            date: '',
            currentId: ''
        };
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    handleData(e) {
        //console.log(e.target);

        //debugger
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loadData() {
        //ajax call logic
        var self = this;

        $.ajax({
            type: "POST",
            url: "/Sale/GetSales/",
            contentType: "application/json",
            success: function (res) {
                self.setState({
                    saleList: res.getSales,
                    customerList: res.allCustomers,
                    productList: res.allProducts,
                    storeList: res.allStores
                })
            }
        })
    }

    add() {
        //ajax call logic
        var self = this;
        event.preventDefault();
        
        $.ajax({
            type: "POST",
            url: "/Sale/AddSales/",
            contentType: "application/json",
            data: JSON.stringify({ customerId: self.state.customer, productId: self.state.product, storeId: self.state.store, dateSold: self.state.date }),
            success: function (res) {
                self.loadData();
                self.handleClose();
            }
        })
    }

    update(id) {
        //ajax call logic
        var self = this;
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/Sale/EditSales?id=" + self.state.currentId,
            data: JSON.stringify({ customerId: self.state.customer, productId: self.state.product, storeId: self.state.store, dateSold: self.state.date }),
            contentType: "application/json",
            success: function (res) {
                self.loadData();
                self.handleClose();
            },
            error: function () {

            }
        })
    }

    delete(id) {
        //ajax call logic
        var self = this;
        //ajax call logic
        $.ajax({
            type: "POST",
            url: "/Sale/DeleteSales?id=" + self.state.currentId,
            //contentType: "application/json",
            success: function (res) {
                self.loadData();
                self.handleClose();
            },
            error: function () {

            }
        })
    }

    handleClose() {

        this.setState({
            deleteModalOpen: false,
            editModalOpen: false,
            createModalOpen: false
        })
    }

    render() {

        let saleList = this.state.saleList;

        console.log(this.state);

        let customerList = this.state.customerList;

        let productList = this.state.productList;

        let storeList = this.state.storeList;

        let tableData = null;

        let customerData = null;

        let productData = null;

        let storeData = null;

        if (customerList != "") {
            customerData = customerList.map(cus =>
                <option key={cus.Id} value={cus.Id}>{cus.Name}</option>
            )
        }

        if (productList != "") {
            productData = productList.map(pro =>
                <option key={pro.Id} value={pro.Id}>{pro.Name}</option>
            )
        }

        if (storeList != "") {
            storeData = storeList.map(str =>
                <option key={str.Id} value={str.Id}>{str.Name}</option>
            )
        }


        if (saleList != "") {
            tableData = saleList.map(sale =>
                <tr key={sale.Id}>
                    <td className="two wide">{sale.Customer}</td>
                    <td className="two wide">{sale.Product}</td>
                    <td className="two wide">{sale.Store}</td>
                    <td className="two wide">{sale.DateSold}</td>
                    <td className="two wide">
                        <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '300px', maxWidth: '300px' }} open={this.state.editModalOpen} onClose={this.handleClose}
                            trigger={<Button className="ui yellow button" onClick={() => this.setState({ customer: sale.Customer, product: sale.Product, store: sale.Store, date: sale.DateSold, currentId: sale.Id, editModalOpen: true })} ><i className="edit icon" ></i>Edit</Button>}>

                            <Modal.Header>Edit Customer</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <form className="ui form">
                                        <div className="field">
                                            <label>Date Sold</label>
                                            <input type="date" name="date" value={this.state.date} onChange={this.handleData}></input>
                                        </div>

                                        <div className="field">
                                            <label>Customer</label>
                                            <select name="customer" onChange={this.handleData}>
                                                <option disabled selected={true}>{this.state.customer}</option>
                                                {customerData}
                                            </select>
                                        </div>

                                        <div className="field">
                                            <label>Product</label>
                                            <select name="product" onChange={this.handleData}>
                                                <option disabled selected={true}>{this.state.product}</option>
                                                {productData}
                                            </select>
                                        </div>

                                        <div className="field">
                                            <label>Store</label>
                                            <select name="store" onChange={this.handleData}>
                                                <option disabled selected={true}>{this.state.store}</option>
                                                {storeData}
                                            </select>
                                        </div>

                                        <button className="ui button" type="submit" onClick={this.update}>Update</button>
                                        <button className="ui button" onClick={this.handleClose}>Cancel</button>
                                    </form>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </td>
                    <td className="two wide">
                        <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '300px', maxWidth: '300px' }} open={this.state.deleteModalOpen} onClose={this.handleClose}
                            trigger={<Button className="ui red button" onClick={() => this.setState({ currentId: sale.Id, deleteModalOpen: true })} > <i className="remove icon"></i> Delete</Button>}>

                            <Modal.Header>Delete Customer</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <p>Do you want to delete this?</p>
                                    <button className="ui red button" onClick={this.delete.bind()}><i className="remove icon"></i> Delete</button>
                                    <button className="ui button" onClick={this.handleClose}>Cancel</button>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </td>
                </tr>
            )
        }

        //console.log(this.state);

        return (
            <React.Fragment>
                <div style={{ margin: '10px 0' }}>
                    <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '300px', maxWidth: '300px' }} open={this.state.createModalOpen} onClose={this.handleClose}
                        trigger={<Button className="ui huge primary button" onClick={() => this.setState({ createModalOpen: true })}>New Sale</Button>}>
                        <Modal.Header>Create Sale</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <form className="ui form">
                                    <div className="field">
                                        <label>Date Sold</label>
                                        <input type="date" name="date" value={this.state.date} onChange={this.handleData} ></input>
                                    </div>

                                    <div className="field">
                                        <label>Customer</label>
                                        <select name="customer" onChange={this.handleData}>
                                            <option disabled selected={true}>-- Select a Customer --</option>
                                            {customerData}
                                        </select>
                                    </div>

                                    <div className="field">
                                        <label>Product</label>
                                        <select name="product" onChange={this.handleData}>
                                            <option disabled selected={true}>-- Select a Product --</option>
                                            {productData}
                                        </select>
                                    </div>

                                    <div className="field">
                                        <label>Store</label>
                                        <select name="store" onChange={this.handleData}>
                                            <option disabled selected={true}>-- Select a Store --</option>
                                            {storeData}
                                        </select>
                                    </div>

                                    <button className="ui button" type="submit" onClick={this.add}>Create</button>
                                    <button className="ui button" onClick={this.handleClose}>Cancel</button>
                                </form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </div>
                <div>
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Customer</th>
                                <th className="two wide">Product</th>
                                <th className="two wide">Store</th>
                                <th className="two wide">Date Sold</th>
                                <th className="two wide">Actions</th>
                                <th className="two wide">Actions</th>
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

var saleView = document.getElementById("saleView");
ReactDOM.render(<SaleTable />, saleView);
