import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'


interface IItemParam {
    item: string,
    qty: string,
    price: string,
    email?: string,
}
interface IError {
    msg: string,
    status: string
}

interface IAppProps{
    error: IError,
    msg: string,
    onSubmitItems(items: IItemParam): void
}

const items: IItemParam = {
    item: '',
    qty: '',
    price: ''
}

class AddStockForm extends Component<IAppProps>{

    constructor(props: IAppProps){
        super(props);
    }

    //updates item variable when user types
    handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.item = event.target.value
        console.log(items.item)
    }

    //updates qty variable when user types
    handleQtyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.qty = event.target.value
        console.log(items.qty)
    }

    //updates price variable when user types
    handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        items.price = event.target.value
        console.log(items.price)
    }

    //Triggers onSubmit method when enter is pressed
    handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
                            <div className='center'>
                                <MDBTypography tag='h2'>Add New Items</MDBTypography>
                                <MDBTypography tag='h5' className='error'>{ error.msg }</MDBTypography>
                            </div>
                        :    
                            (
                                msg !== '' 
                                    ?
                                    <div className='center'>
                                        <MDBTypography tag='h2'>Add New Items</MDBTypography>
                                        <MDBTypography tag='h5' >{ msg }</MDBTypography>
                                    </div>
                                :
                                    <div className='center'>
                                        <MDBTypography tag='h2' className='innitialAddHeading'>Add New Items</MDBTypography>
                                    </div>    
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