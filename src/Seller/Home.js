import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js';
import { useStateValue } from '../StateProvider.js';
import Notifications from './Notifications.js'
import SalesGraph from "./SalesGraph.js"
import TotalSales from './TotalSales.js';
import moment from "moment";
import HeadCards from './HeadCards.js';


function Home() {
    const [{ user }] = useStateValue();
    const[yearSum,setYearSum]=useState(0);
    const[lastYearSum,setLastYearSum]=useState(0);
    const[growth,setGrowth]=useState(0);
    const[monSum,setMonSum]=useState(0);
    const[daySum,setDaySum]=useState(0);
    const[totalSum,setTotalSum]=useState(0);
    const[nProducts,setNProducts]=useState(0);
    const[nOrders,setNOrders]=useState(0);

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
        let yearsum=0,monsum=0,daysum=0,totalsum=0,lastyearsum=0;
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
                            if(moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear()-1)){
                                lastyearsum =parseInt(lastyearsum, 10) + parseInt(doc.data().amount, 10)
                                setLastYearSum(lastyearsum);
                            }
                            if(moment.unix(doc.data().created).format("MM")==(new Date().getMonth()+1) && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                                monsum =parseInt(monsum, 10) + parseInt(doc.data().amount, 10)
                                setMonSum(monsum);
                            }
                            if(moment.unix(doc.data().created).format("MM")==(new Date().getMonth()+1) && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear()) && moment.unix(doc.data().created).format("DD")==(new Date().getDate())){
                                daysum =parseInt(daysum, 10) + parseInt(doc.data().amount, 10)
                                setDaySum(daysum);
                            }
                            totalsum=parseInt(totalsum, 10) + parseInt(doc.data().amount, 10)
                            setTotalSum(totalsum);

                            }
                            
                            ))
            yearsum=0
            monsum=0
            daysum=0
            totalsum=0
            lastyearsum=0

            db.collection("sellers").doc(user?.uid).collection("products").get().then(snap => {
                setNProducts(snap.size)
             });
            db.collection("sellers").doc(user?.uid).collection("orders").get().then(snap => {
            setNOrders(snap.size)
            });
            setGrowth((yearSum-lastYearSum)/lastYearSum*100)
            
        }
    },[user,len])
    
    return (
            //  <h3 style={{backgroundColor:"white"}}>Hello, {user?.displayName} -here's whats happening with your sales</h3> 
               
            <div style={{backgroundColor:"whitesmoke",padding :"30px"}}>
                    
            <div style={{display:"flex" }}>
                <div ></div>
            <div style={{marginBottom :"20px",width:"80%",marginLeft:"21vw"}}><HeadCards totalSum={totalSum} nOrders={nOrders} nProducts={nProducts} growth={growth}/></div></div>
            <div style={{display :"flex"}}>
            <Notifications/>
            <SalesGraph/>
            <TotalSales yearSum={yearSum} monSum={monSum} daySum={daySum} totalSum={totalSum}/>
            
        
        </div>
        </div>
        // </div> 
        
    )
}

export default Home