import React, { Component } from 'react'
import './ViewStock.css'
import {  Table  } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'



class AddStockForm extends Component {

    render(){
        const { stateItems } =  this.props
        
        return(
            <div>
                <center><MDBTypography tag='h2'>Stock Table</MDBTypography></center>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>PRODUCT 1</td>
                        <td>{ stateItems[0].qty }</td>
                        <td>{ 'R ' + stateItems[0].avrPrice.toFixed(2) }</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>PRODUCT 2</td>
                        <td>{ stateItems[1].qty }</td>
                        <td>{ 'R ' + stateItems[1].avrPrice.toFixed(2) }</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>PRODUCT 3</td>
                        <td>{ stateItems[2].qty }</td>
                        <td>{ 'R ' + stateItems[2].avrPrice.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AddStockForm;