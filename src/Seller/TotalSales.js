import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'

function TotalSales({yearSum,monSum,daySum,totalSum}) {
    const[year,setYear]=useState(0);
    const[mon,setMon]=useState(0);
    const[day,setDay]=useState(0);
    const[total,setTotal]=useState(0);
    useEffect(()=>{
        setYear(yearSum);
        setMon(monSum);
        setDay(daySum);
        setTotal(totalSum);
    },[yearSum,monSum,daySum,totalSum])
    return (
        
            <div style={{margin:"0 0 0 20px",backgroundColor:"white",width:"30%"}}>
            <h3 style={{color:"gray",textAlign:"center",marginTop:"10px"}}>Sales Summary</h3>
            <hr/>
            <div style={{marginLeft:"10px",marginRight:"10px"}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Time Period</th>
                    <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>This year</td>
                        <td><CurrencyFormat
                            renderText={(value) => (
                                <div>{value}</div>
                                
                            )}
                            decimalScale={2}
                            value={year}
                            displayType={"text"}
                            thousandSpacing={"2s"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            />
                      </td>
                    </tr>
                    <tr>
                        <td>This month</td>
                        <td><CurrencyFormat
                            renderText={(value) => (
                                <div>{value}</div>
                                
                            )}
                            decimalScale={2}
                            value={mon}
                            displayType={"text"}
                            thousandSpacing={"2s"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            /></td>
                    </tr>
                    <tr>
                        <td>Today</td>
                        <td><CurrencyFormat
                            renderText={(value) => (
                                <div>{value}</div>
                                
                            )}
                            decimalScale={2}
                            value={day}
                            displayType={"text"}
                            thousandSpacing={"2s"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            /></td>
                    </tr>
                    <tr>
                        <td>Total (till date)</td>
                        <td><CurrencyFormat
                            renderText={(value) => (
                                <div>{value}</div>
                                
                            )}
                            decimalScale={2}
                            value={total}
                            displayType={"text"}
                            thousandSpacing={"2s"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            /></td>
                    </tr>
                </tbody>
                </Table>
            </div>
        </div>
        
    )
}

export default TotalSales
