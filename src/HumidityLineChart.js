/* App.js */
import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { Height } from '@mui/icons-material';
//var CanvasJSReact = require('@canvasjs/react-charts');
import TimeRangePicker from './TimeRangePicker';
import axios from 'axios';
import ChartLoader from './Loader/ChartLoader';
import AlertMessage from "./EmptyAlertMessage/Alert"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const  LineChart=()=>{

   // const [chartdata, setchartdata] =useState([]);

    const [lineCharttemDatatem, setlineCharttemDatatem] = useState([])
    const [lineCharttemDataHum, setlineCharttemDataHum] = useState([])
    var [loader, setloader] = useState(false) 
    var [Alertopen, setAlertopen] =useState(false)

    var temperature = []
    var Humidity = []

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currenttime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    //console.log("currentDate", currentDate)
    //console.log("currentDate", new Date(currentDate))
    localStorage.setItem("currentDateTime", currentDate)
    const [todayStartDate, setTodayStartDate] = useState(null);

  useEffect(  () => {
    
    const currentTime = new Date();

    // Subtract 10 minutes (10 * 60 * 1000 milliseconds)
    const tenMinutesAgo = new Date(currentTime - 30 * 60 * 1000);
    
    // Format the result as a string (optional)
    const formattedTenMinutesAgo = tenMinutesAgo.toISOString();
    
      //setTodayStartDate(todayStartDate);
     // console.log("Start", todayStartDate,"end", currentDate,)
      localStorage.setItem("TodayStartDate", todayStartDate)
     fetchRangedata( formattedTenMinutesAgo, currentDate )
        
  }, [todayStartDate]);



    const passData= async(responceData)=>{
        temperature=[]
        Humidity =[]
        for await (var doc of responceData){
            const date = new Date(doc.time);
            const stringDate = date.toString();
            temperature.push({ x: new Date(stringDate), y: doc.obj[0].temp})
            Humidity.push({ x: new Date(stringDate), y: doc.obj[0].humidty})
            //console.log("doc.time " + doc.time)
            //console.log("doc.obj[0].temp "+ doc.obj[0].temp)
            //console.log("doc.obj[0].temp "+ doc.obj[0].humidty)
          }
          setloader(false)
          if(temperature.length == 0){

            setAlertopen(true)
            setTimeout(()=>{
              setAlertopen(false)
            },3000)
          }
          return( setlineCharttemDatatem(temperature), setlineCharttemDataHum(Humidity))
    }

    const fetchRangedata= async (startTime, endTime)=>{
      setloader(true)
        setlineCharttemDatatem([])
        setlineCharttemDataHum([])
       await axios.get('http://localhost:8080/history', { headers:{"startdate": startTime, "enddate":endTime }}).then((response) => {
         // console.log(response.data);
      
        passData(response.data)

         //temperature.push({ x: new Date(response.data.time), y: response.data.obj[0].temp})
        //"2024-01-22T18:00:00"
        }).catch(error => {
          //console.log(error);
        });
        
    
      }
   lineCharttemDatatem.map((data)=>{
    //console.log("lineDate"+ data.x)
   })
   

    const options = {
        theme: "dark2",
        innerHeight:"900px",
        height:400,
        backgroundColor: "#0F0E16",
        zoomEnabled:true,
        zoomType: "xy",
        animationEnabled: true,
        animationDuration: 9000 * 4,
        dataPointMinWidth: 90,
        title: {
            text: "Humidity"
        },
        subtitles: [{
            //text: "GBP & USD to INR"
        }],
        axisX:{
            labelAutoFit: true ,
            labelAngle: 0
        },
        axisY: {
            prefix: "% "
            
        },
        axisY: {
            gridThickness: 0,
            stripLines: [
              {
                value: 0,
                showOnTop: true,
                color: "gray",
                thickness: 2,
              }
            ]
         },
        toolTip: {
            shared: true,
            animationEnabled: true
        },
        stroke: {
            curve: 'smooth'
          },
         
        data: [
        {
            type: "splineArea",
            name: "temp",
            showInLegend: true,
            xValueFormatString: "MMM - DD - YYYY HH : mm : ss",
            yValueFormatString: "#,##0.##",
            color:[ "#f8940655"],
            dataPoints:lineCharttemDataHum

            //  [
            //     { x: new Date("2017- 01- 01"), y: 84},
            //     { x: new Date("2017- 01- 02"), y: 82},
            //     { x: new Date("2017- 01- 03"), y: 81},
            //     { x: new Date("2017- 01- 04"), y: 83},
            //     { x: new Date("2017- 01- 05"), y: 83},
            //     { x: new Date("2017- 01- 06"), y: 84},
            //     { x: new Date("2017- 01- 07"), y: 84},
            //     { x: new Date("2017- 01- 08"), y: 82},
            //     { x: new Date("2017- 01- 09"), y: 87},
            //     { x: new Date("2017- 01- 10"), y: 86},
            //     { x: new Date("2017- 01- 11"), y: 87},
            //     { x: new Date("2017- 01- 12"), y: 86},
            //     { x: new Date("2017- 01- 13"), y: 84},
            //     { x: new Date("2017- 01- 14"), y: 82},
            //     { x: new Date("2017- 01- 15"), y: 81},
            //     { x: new Date("2017- 01- 16"), y: 83},
            //     { x: new Date("2017- 01- 17"), y: 83},
            //     { x: new Date("2017- 01- 18"), y: 84},
            //     { x: new Date("2017- 01- 19"), y: 84},
            //     { x: new Date("2017- 01- 20"), y: 82},
            //     { x: new Date("2017- 01- 21"), y: 87},
            //     { x: new Date("2017- 01- 22"), y: 86},
            //     { x: new Date("2017- 01- 23"), y: 87},
            //     { x: new Date("2017- 01- 24"), y: 86},
            //     { x: new Date("2017- 01- 25"), y: 84},
            //     { x: new Date("2017- 01- 26"), y: 82},
            //     { x: new Date("2017- 01- 27"), y: 81},
            //     { x: new Date("2017- 01- 28"), y: 83},
            //     { x: new Date("2017- 01- 29"), y: 83},
            //     { x: new Date("2017- 01- 30"), y: 84},
            //     { x: new Date("2017- 02- 01"), y: 84},
            //     { x: new Date("2017- 02- 02"), y: 82},
            //     { x: new Date("2017- 02- 03"), y: 81},
            //     { x: new Date("2017- 02- 04"), y: 83},
            //     { x: new Date("2017- 02- 05"), y: 83},
            //     { x: new Date("2017- 02- 06"), y: 84},
            //     { x: new Date("2017- 02- 07"), y: 84},
            //     { x: new Date("2017- 02- 08"), y: 82},
            //     { x: new Date("2017- 02- 09"), y: 87},
            //     { x: new Date("2017- 02- 10"), y: 86},
            //     { x: new Date("2017- 02- 11"), y: 87},
            //     { x: new Date("2017- 02- 12"), y: 86},
            //     { x: new Date("2017- 02- 13"), y: 84},
            //     { x: new Date("2017- 02- 14"), y: 82},
            //     { x: new Date("2017- 02- 15"), y: 81},
            //     { x: new Date("2017- 02- 16"), y: 83},
            //     { x: new Date("2017- 02- 17"), y: 83},
            //     { x: new Date("2017- 02- 18"), y: 84},
            //     { x: new Date("2017- 02- 19"), y: 84},
            //     { x: new Date("2017- 02- 20"), y: 82},
            //     { x: new Date("2017- 02- 21"), y: 87},
            //     { x: new Date("2017- 02- 22"), y: 86},
            //     { x: new Date("2017- 02- 23"), y: 87},
            //     { x: new Date("2017- 02- 24"), y: 86},
            //     { x: new Date("2017- 02- 25"), y: 84},
            //     { x: new Date("2017- 02- 26"), y: 82},
            //     { x: new Date("2017- 02- 27"), y: 81},
            //     { x: new Date("2017- 02- 28"), y: 83},
            //     { x: new Date("2017- 02- 29"), y: 83},
            //     { x: new Date("2017- 02- 30"), y: 84}
            // ]
        },
        ]
    }
	
		
		return (
			<div>
        {loader ?<ChartLoader/>:null}
        {Alertopen? <AlertMessage/>:null} 
                 <TimeRangePicker fetchRangedata={fetchRangedata}/>
				<CanvasJSChart options = {options}
						/* onRef={ref => this.chart = ref} */
				/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}


 export default LineChart;   
