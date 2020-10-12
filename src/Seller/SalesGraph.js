import React, {useEffect, useState} from 'react';
import { Line} from 'react-chartjs-2';
import "./SalesGraph.css"
import { db } from "../firebase";
import moment from "moment";
import { useStateValue } from '../StateProvider';

function SalesGraph() {
    const [ dataChart, setDataChart ] = useState({});
    const [barOptions, setBarOptions] = useState({});
    const [janData, setJanData] = useState(0);
    const [febData, setFebData] = useState(0);
    const [marData, setMarData] = useState(0);
    const [aprData, setAprData] = useState(0);
    const [mayData, setMayData] = useState(0);
    const [junData, setJunData] = useState(0);
    const [julData, setJulData] = useState(0);
    const [augData, setAugData] = useState(0);
    const [sepData, setSepData] = useState(0);
    const [octData, setOctData] = useState(0);
    const [novData, setNovData] = useState(0);
    const [decData, setDecData] = useState(0);
    const [{ user }] = useStateValue();

    
useEffect(()=>{
  
    
    if(user?.uid){
   
        db.collection("sellers")
        .doc(user?.uid)
        .collection("balance")
        .onSnapshot((snapshot)=>
        snapshot.docs.map((doc) => {
            if(moment.unix(doc.data().created).format("MMM")==="Jan" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setJanData( parseInt(janData, 10) + parseInt(doc.data().amount, 10));
            }
            else if(moment.unix(doc.data().created).format("MMM")==="Feb" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setFebData( parseInt(febData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Mar" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setMarData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Arp" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setAprData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }   
            else  if(moment.unix(doc.data().created).format("MMM")==="May" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setMayData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Jun" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setJunData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Jul" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setJulData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Aug" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setAugData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Sep" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setSepData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Oct" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setOctData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Nov" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setNovData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }
            else  if(moment.unix(doc.data().created).format("MMM")==="Dec" && moment.unix(doc.data().created).format("YYYY")==(new Date().getFullYear())){
                setDecData( parseInt(octData, 10) + parseInt(doc.data().amount, 10));
            }  
          }))
        }
},[user])
console.log(octData)
    useEffect(() => {
    
        
       setDataChart({ 
           labels: ['Jan', 'Feb', 'MAr', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
           datasets: [
               {
                   label: 'Sales',
                   tooltipTemplate: "$",
                   data: [
                       janData,
                       febData,
                       marData,
                       aprData,
                       mayData,
                       junData,
                       julData,
                       augData,
                       sepData,
                       octData,
                       novData,
                       decData
                   ],
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.6)',
                       'rgba(54, 162, 235, 0.6)',
                       'rgba(255, 206, 86, 0.6)',
                       'rgba(75, 192, 192, 0.6)',
                       'rgba(255, 99, 132, 0.6)',
                       'rgba(54, 162, 235, 0.6)',
                       'rgba(255, 206, 86, 0.6)',
                       'rgba(75, 192, 192, 0.6)',
                       'rgba(255, 99, 132, 0.6)',
                       'rgba(54, 162, 235, 0.6)',
                       'rgba(255, 206, 86, 0.6)',
                       'rgba(75, 192, 192, 0.6)'
                   ],
                   borderWidth: 3
               }
           ]
         });
         setBarOptions({
            options: {
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return ' ₹' + tooltipItems.yLabel;
                        }
                    }
                },
                scales: {
                    yAxes: [
                        {   
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                },
                title: {
                    display: true,
                    text: `Sales of ${new Date().getFullYear()}`,
                    fontSize: 25,
                    position: 'bottom'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
         })
    },[janData,
        febData,
        marData,
        aprData,
        mayData,
        junData,
        julData,
        augData,
        sepData,
        octData,
        novData,
        decData])
    return (
        <div className="sales_graph">
            <Line
                data={dataChart}
                width={100}
                height={50}
                options={barOptions.options}
                />
        </div>
    )
}

export default SalesGraph
