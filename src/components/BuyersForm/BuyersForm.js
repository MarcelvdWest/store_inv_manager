import React, { Component } from 'react'
import './BuyersForm.css'
import { Form, Button } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'


const items = {
    email: '',
    item: '',
    qty: 0
}


class AddStockForm extends Component {

    //updates email variable when user types
    handleEmailChange = (event) => {
        items.email = event.target.value
        console.log(items.email)
    }
    
    //updates item variable when user type
    handleItemChange = (event) => {
        items.item = event.target.value
        console.log(items.item)
    }

    //updates qty variable when user types
    handleQtyChange = (event) => {
        items.qty = event.target.value
        console.log(items.qty)
    }

    //Triggers onSubmit method when enter is pressed
    handleEnter = (event) => {
        if(event.key === 'Enter'){
            this.props.onSubmitOrder(items)
        }
    }

    onButtonPress = () => {
        this.props.onSubmitOrder(items)
    }

    render(){

        const { error, msg, stateItems } = this.props

        return(
            <div>
                {
                    //Dynamic changes to page depending on user action
                    error.status === 'true' 
                        ?
                            <center>
                                <MDBTypography tag='h2'>Buy Items</MDBTypography>
                                <MDBTypography tag='h5' className='error'>{ error.msg }</MDBTypography>
                            </center>
                        :    
                            (
                                msg !== '' 
                                    ?
                                    <center>
                                        <MDBTypography tag='h2'>Buy Items</MDBTypography>
                                        <MDBTypography tag='h5' >{ msg }</MDBTypography>
                                    </center>
                                :
                                    <center>
                                        <MDBTypography tag='h2' className='innitialAddHeading'>Buy Items</MDBTypography>
                                    </center>    
                            )                                    
                }
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor='email'>Email: </Form.Label>
                        <Form.Control 
                            type='email' 
                            id='email' 
                            onChange = {this.handleEmailChange}
                            onKeyPress = {this.handleEnter}
                        />
                    </Form.Group> 
                    <Form.Group>
                        <Form.Label htmlFor='item'>Item: </Form.Label>
                        <Form.Control 
                            as='select'
                            id='item'
                            onChange = {this.handleItemChange}
                            custom
                        >
                            <option value="0">{ 'PRODUCT 1 - Price: R' +  stateItems[0].avrPrice + ' Stock: ' + stateItems[0].qty }</option>
                            <option value="1">{ 'PRODUCT 2 - Price: R' +  stateItems[1].avrPrice + ' Stock: ' + stateItems[1].qty }</option>
                            <option value="2">{ 'PRODUCT 3 - Price: R' +  stateItems[2].avrPrice + ' Stock: ' + stateItems[2].qty }</option>
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
                    <Button 
                        variant= 'secondary' 
                        type='button' 
                        onClick = {this.onButtonPress}
                    >
                        Buy Items
                    </Button> 
                </Form>
            </div>
        )
    }
}

export default AddStockForm;