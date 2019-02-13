import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, Header, Image, Modal } from 'semantic-ui-react';

export default class StoreTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            name: '',
            address: '',
            deleteModalOpen: false,
            editModalOpen: false,
            createModalOpen: false,
            currentId: null
        };
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var self = this;

        $.ajax({
            type: "POST",
            url: "/Store/GetStores/",
            contentType: "application/json",
            success: function (res) {
                console.log(res);
                self.setState({
                    storeList: res
                })
            },
            error: function (res) {
                console.log(res);
            }
        });
    }

    handleData(e) {
        console.log(e.target);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add(event) {
        var self = this;
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/Store/AddStores/",
            data: JSON.stringify({ name: self.state.name, address: self.state.address }),
            contentType: "application/json",
            success: function (res) {
                self.setState({
                    storeList: res.allStores
                })
                self.handleClose();
            },
            error: function () {

            }
        })
    }

    update(event) {
        var self = this;
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/Store/EditStores?id=" + self.state.currentId,
            data: JSON.stringify({ name: self.state.name, address: self.state.address }),
            contentType: "application/json",
            success: function (res) {
                self.setState({
                    storeList: res.allStores
                })
                self.handleClose();
            },
            error: function () {

            }
        })
    }

    delete(event) {
        var self = this;
        //ajax call logic
        $.ajax({
            type: "POST",
            url: "/Store/DeleteStores?id=" + self.state.currentId,
            //contentType: "application/json",
            success: function (res) {
                self.setState({
                    storeList: res.allStores
                })
                self.handleClose();
            },
            error: function () {
                console.log("error");
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

        let storeList = this.state.storeList;

        let tableData = null;

        if (storeList != "") {
            tableData = storeList.map(store =>
                <tr key={store.Id}>
                    <td className="four wide">{store.Name}</td>
                    <td className="four wide">{store.Address}</td>
                    <td className="four wide">
                        {/*<button className="ui yellow button"><i className="edit icon" onClick={this.update.bind(this, store.Id)}></i>Edit</button>*/}
                        <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '250px' }} open={this.state.editModalOpen} onClose={this.handleClose}
                            trigger={<Button className="ui yellow button" onClick={() => this.setState({ name: store.Name, address: store.Address, currentId: store.Id, editModalOpen: true })} ><i className="edit icon" ></i>Edit</Button>}>

                            <Modal.Header>Edit Store</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <form className="ui form">
                                        <div className="field">
                                            <label>Name</label>
                                            <input type="text" name="name" value={this.state.name} onChange={this.handleData}></input>
                                        </div>
                                        <div className="field">
                                            <label>Address</label>
                                            <input type="text" name="address" value={this.state.address} onChange={this.handleData}></input>
                                        </div>
                                        <button className="ui button" type="submit" onClick={this.update.bind()}>Edit</button>
                                        <button className="ui button" onClick={this.handleClose}>Cancel</button>
                                    </form>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </td>
                    <td>
                        {/*<button className="ui red button" onClick={this.delete.bind(this, store.Id)}><i className="remove icon"></i> Delete</button>*/}
                        <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '250px' }} open={this.state.deleteModalOpen} onClose={this.handleClose}
                            trigger={<Button className="ui red button" onClick={() => this.setState({ currentId: store.Id, deleteModalOpen: true })} > <i className="remove icon"></i> Delete</Button>}>

                            <Modal.Header>Delete Store</Modal.Header>
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

        return (
            <React.Fragment>
                <div style={{ margin: '10px 0' }}>
                    <Modal style={{ marginTop: '50%', margin: 'auto', maxHeight: '250px' }} open={this.state.createModalOpen} onClose={this.handleClose}
                        trigger={<Button className="ui huge primary button" onClick={() => this.setState({ createModalOpen: true })}>New Store</Button>}>
                        <Modal.Header>Create Store</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <form className="ui form">
                                    <div className="field">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="Name" onChange={this.handleData}></input>
                                    </div>
                                    <div className="field">
                                        <label>Address</label>
                                        <input type="text" name="address" placeholder="Address" onChange={this.handleData}></input>
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

var storeView = document.getElementById("storeView");
ReactDOM.render(<StoreTable />, storeView);