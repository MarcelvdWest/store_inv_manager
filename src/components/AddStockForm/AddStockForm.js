import React, { Component } from 'react'
import './AddStockForm.css'
import { Form, Button } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'


const items = {
    item: '',
    qty: 0,
    price: 0
}


class AddStockForm extends Component {

    //updates item variable when user types
    handleItemChange = (event) => {
        items.item = event.target.value
        console.log(items.item)
    }

    //updates qty variable when user types
    handleQtyChange = (event) => {
        items.qty = event.target.value
        console.log(items.qty)
    }

    //updates price variable when user types
    handlePriceChange = (event) => {
        items.price = event.target.value
        console.log(items.price)
    }

    //Triggers onSubmit method when enter is pressed
    handleEnter = (event) => {
        if(event.key === 'Enter'){
            this.props.onSubmitItems(items)
        }
    }

    onButtonPress = () => {
        this.props.onSubmitItems(items)
    }

    render(){

        const { error, msg } = this.props

        return(
            <div>
                {
                    //Dynamic changes to page depending on user action
                    error.status === 'true' 
                        ?
                            <center>
                                <MDBTypography tag='h2'>Add New Items</MDBTypography>
                                <MDBTypography tag='h5' className='error'>{ error.msg }</MDBTypography>
                            </center>
                        :    
                            (
                                msg !== '' 
                                    ?
                                    <center>
                                        <MDBTypography tag='h2'>Add New Items</MDBTypography>
                                        <MDBTypography tag='h5' >{ msg }</MDBTypography>
                                    </center>
                                :
                                    <center>
                                        <MDBTypography tag='h2' className='innitialAddHeading'>Add New Items</MDBTypography>
                                    </center>    
                            )                                    
                }
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor='item'>Item: </Form.Label>
                        <Form.Control 
                            as='select'
                            id='item'
                            onChange = {this.handleItemChange}
                            custom
                        >
                            <option value="0">PRODUCT 1</option>
                            <option value="1">PRODUCT 2</option>
                            <option value="2">PRODUCT 3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='qty'>Qty: </Form.Label>
                        <Form.Control 
                            type='number' 
                            id='qty' 
                            onChange = {this.handleQtyChange}
                            onKeyPress = {this.handleEnter}
                            autoComplete = "off"
                        />
                    </Form.Group> 
                    <Form.Group>
                        <Form.Label htmlFor='price'>Price per Item: </Form.Label>
                        <Form.Control 
                            type='number' 
                            id='price'
                            onChange = {this.handlePriceChange}
                            onKeyPress = {this.handleEnter}
                            autoComplete = "off"        
                        />
                    </Form.Group>
                    <Button 
                        variant= 'secondary' 
                        type='button' 
                        onClick = {this.onButtonPress}
                    >
                        Add Items
                    </Button> 
                </Form>
            </div>
        )
    }
}

export default AddStockForm;