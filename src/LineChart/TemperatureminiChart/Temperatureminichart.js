/* App.js */
import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { Height } from '@mui/icons-material';
//var CanvasJSReact = require('@canvasjs/react-charts');
import axios from 'axios';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const  LineChart=()=>{

   // const [chartdata, setchartdata] =useState([]);

    const [lineCharttemDatatem, setlineCharttemDatatem] = useState([])
    const [lineCharttemDataHum, setlineCharttemDataHum] = useState([])
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
    console.log("currentDate", currentDate)
    console.log("currentDate", new Date(currentDate))
    localStorage.setItem("currentDateTime", currentDate)
    const [todayStartDate, setTodayStartDate] = useState(null);


  useEffect(  () => {
    
    const currentTime = new Date();

    // Subtract 10 minutes (10 * 60 * 1000 milliseconds)
    const tenMinutesAgo = new Date(currentTime - 2 * 60 * 1000);
    
    // Format the result as a string (optional)
    const formattedTenMinutesAgo = tenMinutesAgo.toISOString();
    
    console.log("Current Time:", currentTime.toISOString());
    console.log("10 Minutes Ago:", formattedTenMinutesAgo);
     fetchRangedata( formattedTenMinutesAgo, currentDate )
    // Get the current time



    
  }, [todayStartDate]);



    const passData= async(responceData)=>{
        temperature=[]
        Humidity =[]
        for await (var doc of responceData){
            const date = new Date(doc.time);
            const stringDate = date.toString();
            temperature.push({ x: new Date(stringDate), y: doc.obj[0].temp})
            Humidity.push({ x: new Date(stringDate), y: doc.obj[0].humidty})
            console.log("doc.time " + doc.time)
            console.log("doc.obj[0].temp "+ doc.obj[0].temp)
            console.log("doc.obj[0].temp "+ doc.obj[0].humidty)
          }
          return( setlineCharttemDatatem(temperature), setlineCharttemDataHum(Humidity))
    }

    const fetchRangedata= async (startTime, endTime)=>{
        setlineCharttemDatatem([])
        setlineCharttemDataHum([])
       await axios.get('http://localhost:8080/history', { headers:{"startdate": startTime, "enddate":endTime }}).then((response) => {
          console.log(response.data);

        passData(response.data)

         //temperature.push({ x: new Date(response.data.time), y: response.data.obj[0].temp})
        //"2024-01-22T18:00:00"
        }).catch(error => {
          console.log(error);
        });
    
      }
   lineCharttemDatatem.map((data)=>{
    console.log("lineDate"+ data.x)
   })
   

    const options = {
        theme: "dark2",
        innerHeight:"900px",
        height:300,
        backgroundColor: "#0F0E16",
        zoomEnabled:true,
        zoomType: "xy",
        animationEnabled: true,
        animationDuration: 3000,
        dataPointMinWidth: 90,
        title: {
            text: "Temperature"
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
                thickness: 2
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
            name: "Tem",
            showInLegend: true,
            xValueFormatString: "MMM - DD - YYYY HH : mm : ss",
            yValueFormatString: "#,##0.##",
            color:[ "#e6d92a77"],
            dataPoints:lineCharttemDatatem

           
        },
        
        ]
    }
	
		
		return (
			<div style={{marginLeft:"5%"}}>
				<CanvasJSChart options = {options}
						/* onRef={ref => this.chart = ref} */
				/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}


 export default LineChart;   
