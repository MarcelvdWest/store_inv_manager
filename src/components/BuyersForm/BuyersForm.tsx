import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'

interface IItemParam {
    item: string,
    qty: string,
    price?: string,
    email: string
}

interface IError {
    msg: string,
    status: string
}

interface IItem {
    item: string,
    qty: number,
    avrPrice: number,
    count: number
}

interface IAppProps{
    onSubmitOrder(items: IItemParam): void,
    error: IError,
    msg: string,
    stateItems: Array<IItem>
}

const items: IItemParam = {
    email: '',
    item: '',
    qty: ''
}




class AddStockForm extends Component<IAppProps> {

    //updates email variable when user types
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.email = event.target.value
        console.log(items.email)
    }
    
    //updates item variable when user type
    handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.item = event.target.value
        console.log(items.item)
    }

    //updates qty variable when user types
    handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.qty = event.target.value
        console.log(items.qty)
    }

    //Triggers onSubmit method when enter is pressed
    handleEnter = (event: React.KeyboardEvent) => {
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
                            <div className='center'>
                                <MDBTypography tag='h2'>Buy Items</MDBTypography>
                                <MDBTypography tag='h5' className='error'>{ error.msg }</MDBTypography>
                            </div>
                        :    
                            (
                                msg !== '' 
                                    ?
                                    <div className='center'>
                                        <MDBTypography tag='h2'>Buy Items</MDBTypography>
                                        <MDBTypography tag='h5' >{ msg }</MDBTypography>
                                    </div>
                                :
                                    <div className='center'>
                                        <MDBTypography tag='h2' className='innitialAddHeading'>Buy Items</MDBTypography>
                                    </div>    
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