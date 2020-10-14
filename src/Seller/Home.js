import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js';
import { useStateValue } from '../StateProvider.js';
import Notifications from './Notifications.js'
import SalesGraph from "./SalesGraph.js"
import TotalSales from './TotalSales.js';
import moment from "moment";


function Home() {
    const [{ user }] = useStateValue();
    const[yearSum,setYearSum]=useState(0);
    const[monSum,setMonSum]=useState(0);
    const[daySum,setDaySum]=useState(0);
    const[len,setLen]=useState(0);

    useEffect(()=>{
        if(user?.uid){
            db.collection("sellers")
            .doc(user?.uid)
                .collection("balance")
                    .get().then(snap => {
                        setLen(snap.size);
                    });
        }
    })

    useEffect(() => {
        let yearsum=0,monsum=0,daysum=0;
        if(user?.uid){
            db.collection("sellers")
                .doc(user?.uid)
                    .collection("balance")
                        .onSnapshot((snapshot)=>
                          snapshot.docs.map((doc) => {
                            if(moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                                yearsum =parseInt(yearsum, 10) + parseInt(doc.data().amount, 10)
                                setYearSum(yearsum);
                            }
                            if(moment.unix(doc.data().created).format("MM")==(new Date().getMonth()+1) && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                                monsum =parseInt(monsum, 10) + parseInt(doc.data().amount, 10)
                                setMonSum(monsum);
                            }
                            if(moment.unix(doc.data().created).format("MM")==(new Date().getMonth()+1) && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear()) && moment.unix(doc.data().created).format("DD")==(new Date().getDate())){
                                daysum =parseInt(daysum, 10) + parseInt(doc.data().amount, 10)
                                setDaySum(daysum);
                            }
                            }
                            
                            ))
                            yearsum=0
                            monsum=0
                            daysum=0
        }
    },[user,len])

    useEffect(()=>{
        // window.location.reload(false)
    })

    return (
            //  <h3 style={{backgroundColor:"white"}}>Hello, {user?.displayName} -here's whats happening with your sales</h3> 
               
            <div style={{backgroundColor:"whitesmoke",padding :"30px"}}>
                    
            
            <div style={{backgroundColor:"white",marginBottom :"20px"}}>dfghjdfgiu</div>
            <div style={{display :"flex"}}>
            <Notifications/>
            <SalesGraph/>
            <TotalSales yearSum={yearSum} monSum={monSum} daySum={daySum}/>
            
        
        </div>
        </div>
        // </div> 
        
    )
}

export default Home