import React, { Component } from 'react'
import AddStockForm from '../components/AddStockForm/AddStockForm'
import BuyersForm from '../components/BuyersForm/BuyersForm'
import ViewStock from '../components/ViewStock/ViewStock'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Button } from 'react-bootstrap'
import { MDBTypography } from 'mdbreact'
import './App.css'

//This creates an object to store data for the session
const initialState = {
  stateItems: [
    {
      item: '0',
      qty: 0,
      avrPrice: 0,
      count: 0
    },
    {
      item: '1',
      qty: 0,
      avrPrice: 0,
      count: 0
    },
    {
      item: '2',
      qty: 0,
      avrPrice: 0,
      count: 0
    }
  ],
  emails: ['test'],
  error:  {
    msg: '',
    status: 'false'
  },
  msg: '', 
  loc: 'AddStock'
}


class App extends Component {
  
  constructor(){
    super();
    this.state = initialState; //Creates that state object
  }

  //Uses user input to update the state variable. Used with AddStockForm
  onSubmitItems = ( items ) => {
    const { stateItems } = this.state
    
    if(items.qty > 0 && items.price > 0){
      const currQty = stateItems[Number(items.item)].qty
      const totalQty = Number(currQty) + Number(items.qty)
      stateItems[Number(items.item)].qty = totalQty

      const currAvr = stateItems[Number(items.item)].avrPrice
      const currCount = stateItems[Number(items.item)].count
      const totalAvr = (Number(currAvr)*Number(currCount) + Number(items.price) * Number(items.qty)) / (Number(currCount) + Number(items.qty))
      stateItems[Number(items.item)].avrPrice = totalAvr
      stateItems[Number(items.item)].count = Number(currCount) + Number(items.qty)

      this.setState({ stateItems: stateItems , msg: items.qty + ' Items added successfully', error: {status: 'false'}})
    } else if(items.qty < 0){
      this.setState({ error: { msg: 'The qty must be larger than zero' , status: 'true'}})
    }else {
      this.setState({ error: { msg: 'The price must be larger than zero' , status: 'true'}})
    }
  }

  //Uses user input to update the state variable. Used with BuyersForm
  onSubmitOrder = ( items ) => {
    const { stateItems , emails } = this.state
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(items.email === ''){
      this.setState({error: {msg: 'You must enter a email address', status: 'true'}})
    }else if(!items.email.match(pattern)){
      this.setState({error: {msg: 'That is not a valid email address', status: 'true'}})
    }else if(emails.includes(items.email)){
      this.setState({error: {msg: 'You have already made a purchase', status: 'true'}}) 
    }else{
      if(items.qty > 0){
        if(stateItems[Number(items.item)] < items.qty){
          this.setState({error: {msg: 'There is currently not enough stock of that item', status: 'true'}})
        }else{
          emails.push(items.email)

          const currQty = stateItems[Number(items.item)].qty
          const totalQty = Number(currQty) - items.qty
          stateItems[Number(items.item)].qty = totalQty

          this.setState({ 
            stateItems: stateItems , 
            msg: 'Your total cost is R ' + (items.qty * stateItems[Number(items.item)].avrPrice) , 
            error: {status: 'false'}})
        }
      } else {
        this.setState({ error: { msg: 'The qty must be larger than zero' , status: 'true'}})
      }
    }
  } 

  changeLocation = (event) => {
    const btn = event.target.id
    
    this.setState({ loc: btn })
  }
 
  render() {
    
    const { error, msg, stateItems  } = this.state

    return(
      <div>
        <center className='mainHeading'><MDBTypography tag='h1' variant='display-1'>Corner Store</MDBTypography></center>
        <Navbar variant="dark" bg="dark" className='row justify-content-center nav'>
            <Button variant='secondary' className='navBtn' id='AddStock' onClick={ this.changeLocation } >Add Stock</Button>
            <Button variant='secondary' className='navBtn' id='BuyItems' onClick={ this.changeLocation } >Buy Items</Button>
            <Button variant='secondary' className='navBtn' id='ViewStock' onClick={ this.changeLocation } >View Stock</Button>
        </Navbar>
         {
          loc === 'AddStock' 
            ? 
              <AddStockForm onSubmitItems={this.onSubmitItems} error={ error } msg={ msg } />
            :
             (
               loc === 'BuyItems' 
                ? 
                  <BuyersForm onSubmitOrder={this.onSubmitOrder} error={ error } msg={ msg } stateItems={ stateItems } />
                :
                  <ViewStock stateItems={ stateItems } />  
             )
         } 
                 
      </div>
    );
  }  
} 
  

export default App;
