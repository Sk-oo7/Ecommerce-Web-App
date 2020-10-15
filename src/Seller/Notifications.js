import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider';

function Notifications() {
    const [note,setNote]=useState([]);


    const[{user}]=useStateValue();
    useEffect(()=>{
        if(user){
            db.collection("sellers").doc(user?.uid).collection("notifications").orderBy("created").limit(4).onSnapshot((snapshot) =>
            setNote(
            snapshot.docs.map((doc) => {
                return doc.data()
            }))
          );
        }
    },[user])
    
    return (
        <div style={{margin:"-180px 20px 0 0",backgroundColor:"white",width:"30%"}}>
            <h3 style={{color:"gray",textAlign:"center",marginTop:"10px"}}>Notifications</h3>
            <hr/>
            <div style={{marginLeft:"10px",marginRight:"10px"}}>
            {note.map((n)=> 
                    <Alert variant={n?.variant}>{n?.msg}</Alert>
              )} 
            </div>
            
        </div>
    )
}

export default Notifications
