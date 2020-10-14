
import React from 'react'
import { Alert } from 'react-bootstrap'

function Notifications() {
    return (
        <div style={{margin:"0 20px 0 0",backgroundColor:"white",width:"30%"}}>
            <h3 style={{color:"gray",textAlign:"center",marginTop:"10px"}}>Notifications</h3>
            <hr/>
            <div style={{marginLeft:"10px",marginRight:"10px"}}>
            <Alert variant="primary">You Got a New Order</Alert>
            <Alert variant="success">Money added to your Bank Account</Alert>
            </div>
            
        </div>
    )
}

export default Notifications
