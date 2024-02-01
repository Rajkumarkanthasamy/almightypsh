import logo from './logo.svg';
import './App.css';
import Meter from './Meter';
import {Container,} from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import {Button, IconButton, Typography, Box, Grid} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Options from './Options'
import WidgetsIcon from '@mui/icons-material/Widgets';
import NotesIcon from '@mui/icons-material/Notes';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CachedIcon from '@mui/icons-material/Cached';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GaugeChart from 'react-gauge-chart'
import GaugeComponent from 'react-gauge-component'
import LineChart from "./LineChart"
import Battery from './Battery';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
//import {ViewInArIcon} from '@mui/icons-material';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import HumidityMeter from './HumitidyMeter';
import EmptyCell from './AlertFolder/EmptyCell';
import { useEffect, useState } from 'react';
import AddCell from './AddCell/AddCell';
//import { set } from 'mongoose';
import axios from 'axios';
import TimeRangePicker from './TimeRangePicker';
import Serverdata from './Serverdata.json';
import { Sync } from '@mui/icons-material';
import AnimationPieChart from './AnimationPieChart/Piechart';
import AmimationHumPiechart from "./AnimationPieChart/HumPiechart"
import TemperartureMiniChart from "./LineChart/TemperatureminiChart/Temperatureminichart"
import HumidityMiniChart from "./LineChart/HumChart/HumMinichart";
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import AlertNotification from './AlertNotification/AlertNotification'
import HumidityLineChart from "./HumidityLineChart"
import BatterUI from "./BatteryUI/Battery"
import ALertTemplate from './AlertNotification/ALertTemplate';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ListItemButton from '@mui/material/ListItemButton';
import Humidity from './HumitidyMeter';
//import "./AlertNotification.css"
import List from '@mui/material/List';
import Loader from './Loader/Loader';

const Content = styled(Paper)`
    min-height: 100%;
`

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:"352px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#0F0E16"//0F0E16
  
}));


const ItemBattery = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:"352px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#0F0E16",//7973a5
  borderTopLeftRadius:"0px",
  borderTopRightRadius:"0px",
}));

const LinechartGraph = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:"352px",
  // display:"flex",
  // justifyContent:"left",
  // alignItems:"center",
  backgroundColor:"#0F0E16",//7973a5
  borderTopLeftRadius:"0px",
  borderTopRightRadius:"0px",
  overflow:"hidden"
}));

function App() {

    const [openAddCell, setopenAddCell] = useState(false) 

    const [openTemperature, setopenTemperature] = useState(false);
    const [openHumidity, setopenHumidity] = useState(false);
    const [openAlert, setopenAlert] = useState(false);
    const [TotalNumberOfCell, setTotalNumberOfCell] = useState([{index:0, DeviceName:"MAC ID 1"}, {index:0, DeviceName:"MAC ID 2"}, {index:0, DeviceName:"MAC ID 3"},{index:0, DeviceName:"MAC ID 4"}, {index:0, DeviceName:"MAC ID 5"}])
    const [showEmptyCell, setshowEmptyCell] = useState(true) 

    const [CurrentDeviceValue, setCurrentDeviceValue]=useState({Temperature:"", Humidity:"", Batterypercentage:""})

    const [currentDeviceId, setcurrentDeviceId] = useState(0)

    const [tempMQTT, settempMQTT] = useState(null)
    const [humidtyMQTT, sethumidtyMQTT] = useState(null)
    const [vbattMQTT, setvbattMQTT] = useState(null)
    const [vbattaMQTTBalance, setvbattaMQTTBalance] = useState(null)
    var currentTemperature ;
    var currentHumidity;
    const [startTime, setstartTime] = useState(null)
    const [endTime, setendTime] = useState(null)
   
    var list = []
    
    const [currentTime, setcurrentTime] = useState()
// Reverse the array

    const [AlertList, setAlertList] = useState([])

    var [loader, setLoader]= useState(true)
    
    const [checkTemperatureandHum, setcheckTemperatureandHum] = useState(true)

    var regex = /\d{0,2}/;

    const serverresponse = async () => {
      const response = await axios.get('http://localhost:8080/MQTTdata')        
      return response.data
  }

setInterval(()=>{
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const currenttime = `${year}-${month}-${day} - ${hours}:${minutes}:${seconds}`;
  setcurrentTime(currenttime)
}, 1000)
useEffect(()=>{


const intervalId = setInterval(() => {
  var temperature = `${tempMQTT}`
  var humidity = `${humidtyMQTT}`
  console.log("tempMQTT", temperature)
  console.log("tempMQTT", humidity)

  if(tempMQTT => 25){
    var temperature = `${currentTemperature}`
    var humidity = `${currentHumidity}`
    setcheckTemperatureandHum(false)
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currenttime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
   //list_alert.push({Header:"tem", text:"alert"})
   //setAlertList(AlertList => [...AlertList, {Header:"High Temperature", time:"", DeviceMACID:"A1B2C3D4", AlertType:"High", temperature: temperature, humidty: humidity}])
   list.push({Header:"High Temperature", time: currenttime, DeviceMACID:"A1B2C3D4", AlertType:"High", temperature: temperature, humidity: currentHumidity})
    
   setAlertList([...list])
   console.log("high temperature Alert")
  
  }
  if(humidtyMQTT => 50){
    var temperature = `${currentTemperature}`
    var humidity = `${currentHumidity}`
    setcheckTemperatureandHum(false)
    const currentDate = new Date()
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currenttime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
   //list_alert.push({Header:"tem", text:"alert"})
   //setAlertList(AlertList => [...AlertList, {Header:"High Temperature", time:"", DeviceMACID:"A1B2C3D4", AlertType:"High", temperature: temperature, humidty: humidity}])
   list.push({Header:"High Humidity", time:currenttime, DeviceMACID:"A1B2C3D4", AlertType:"High", temperature: temperature, humidity: currentHumidity})
   setAlertList([...list])
   console.log("high temperature Alert")
  
  }

}, 6000);

return () => {
  // Cleanup the interval on component unmount
  clearInterval(intervalId);
};   

},[])

  // { x: new Date("2017- 01- 01"), y: 84},
  // serverdata.obj[0].temp

  
  

  // Serverdata.map((serverdata)=>{
  //  temperature.push({ x: new Date(serverdata.time), y: serverdata.obj[0].temp})
  // // return(setlineCharttemData(...temperature))

  // }) 
 

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Your code here
      //console.log('Interval executed');

       serverresponse().then((res)=>{
    //  console.log(res.obj[0].vbatt)
      sethumidtyMQTT(res.obj[currentDeviceId].humidty)
      var convertPercentage = (res.obj[currentDeviceId].vbatt / 3594) * 100
      setvbattMQTT(convertPercentage)
      setvbattaMQTTBalance(convertPercentage - 100)
      settempMQTT(res.obj[currentDeviceId].temp)
      currentHumidity = res.obj[currentDeviceId].humidty;
      currentTemperature = res.obj[currentDeviceId].temp;
      setLoader(false)
    }).catch((errors)=>{
      //console.log(errors)
    })
    }, 2000);

    return () => {
      // Cleanup the interval on component unmount
      clearInterval(intervalId);
     
    };
  }, []);

//{Header:"High Temperature", time:"", DeviceMACID:"A1B2C3D4", AlertType:"High", temperature: tempMQTT, humidty:humidtyMQTT}
  const dataTemplate=(Header, time, DeviceMACID, AlertType, temperature, humidity, index)=>{
    return(
      <table style={{color:"#FFF", opacity:"0.9", border:"1px solid #FFF", width:"100%", textAlign:"center", borderCollapse:"collapse"}}>
    <tr style={{border:"1px solid #FFF"}}>
      <td style={{border:"1px solid #FFF"}}>TimeStamp</td>
      <td style={{border:"1px solid #FFF"}}>Device MAC ID </td>
      <td style={{border:"1px solid #FFF"}}>Temperature</td>
      <td style={{border:"1px solid #FFF"}}>Humidity</td>
      <td style={{border:"1px solid #FFF"}}>Alert Type</td>
    </tr>
    <tr>
      <td style={{border:"1px solid #FFF"}}>2024-01-29T10:30</td>
      <td style={{border:"1px solid #FFF"}}>{DeviceMACID}</td>
      <td style={{border:"1px solid #FFF"}}>{temperature}</td>
      <td style={{border:"1px solid #FFF"}}>{humidity}</td>
      <td style={{border:"1px solid #FFF"}}>{AlertType + index}</td>
    </tr>
   
  </table>
  
    )
  }

  const [openAlertNotification, setopenAlertNotification] = useState(false);

  var alertListTemplate = AlertList.map((DeviceDetails, index) => {
   // console.log("Header.Header", JSON.stringify(DeviceDetails) )
            return(
  
        <ListItem key={index} alignItems="flex-start" >
        <ListItemButton  className='NOtificationAlert' 
        onClick={()=>setopenAlertNotification(true)}

        sx={{color:"#FFF", backgroundColor:DeviceDetails.Header === "High Temperature"? "#e6d92a55": "#f8940644", borderRadius:"10px", position:"relative"}}>
        <ListItemAvatar>
            <CircleNotificationsIcon sx={{ fontSize: 40, color:"#f89406" }} />

          </ListItemAvatar>
          <ListItemText
            // primary="High Temperature"
            style={{color:"#FFF", textAlign:"left"}}
            // secondary={
            //   // <React.Fragment >
            //   //   <Typography
            //   //     sx={{ display: 'inline' }}
            //   //     component="span"
            //   //     variant="body2"
            //   //     color="#FFF"
            //   //   >
            //   //     {index}
            //   //     Ali Connors
            //   //     — I'll be in your neighborhood doing errands this…
            //   //   </Typography>
               
            //   // </React.Fragment>
            // }
            
          >
          
          <Typography>{DeviceDetails.Header}</Typography>
          <Typography sx={{ display: 'inline' }}>{DeviceDetails.time}</Typography>
          <Typography
           sx={{ display: 'inline', marginLeft:"40px" }}
                  component="span"
                  variant="body2"
                  color="#FFF"
                >
                  {DeviceDetails.Header == "High Temperature" ? DeviceDetails.temperature : DeviceDetails.humidity}{DeviceDetails.Header == "High Temperature" ? "°c": "%" } 
                </Typography>
          </ListItemText>
           </ListItemButton>
           
           <div style={{position:"fixed", top:"440px",right:"615px"}}>
          {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#00000001" }}
                open={openAlertNotification}
                
              > */}
              
         <Box sx={{height:"200px", width:"600px", backgroundColor:"#272822", marginTop:"20%", borderRadius:"21px", marginLeft:"15%", display:openAlertNotification?"block":"none",}}>
          <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", backgroundColor:"#272822",  borderRadius:"21px"}}>
            <IconButton style={{ backgroundColor:"#0F0E16"}}>
            <CloseIcon onClick={()=>setopenAlertNotification(false)} sx={{color:"#FFF"}}/>
            </IconButton></div>
            <ListItemText
            // primary="High Temperature"
            style={{color:"#FFF", paddingLeft:"1%", paddingRight:"1%"}}
            secondary={
              //dataTemplate(DeviceDetails.Header, DeviceDetails.time, DeviceDetails.DeviceMACID, DeviceDetails.AlertType, DeviceDetails.temperature, DeviceDetails.humidity, index)
             <>
             <table style={{color:"#FFF", opacity:"0.9", border:"1px solid #FFF", width:"100%", textAlign:"center", borderCollapse:"collapse", height:"130px"}}>
              <tr style={{border:"1px solid #FFF"}}>
                <td style={{border:"1px solid #FFF"}}>Time</td>
                <td style={{border:"1px solid #FFF"}}>Device MAC ID </td>
                <td style={{border:"1px solid #FFF"}}>Temperature</td>
                <td style={{border:"1px solid #FFF"}}>Humidity</td>
                <td style={{border:"1px solid #FFF"}}>Alert Type</td>
              </tr>
              <tr>
                <td style={{border:"1px solid #FFF"}}>{DeviceDetails.time}</td>
                <td style={{border:"1px solid #FFF"}}>{DeviceDetails.DeviceMACID}</td>
                <td style={{border:"1px solid #FFF"}}>{DeviceDetails.temperature}</td>
                <td style={{border:"1px solid #FFF"}}>{DeviceDetails.humidity}</td>
                <td style={{border:"1px solid #FFF"}}>{DeviceDetails.AlertType}</td>
              </tr>
             
            </table>
            </>
            }
          />
  
       
         </Box>
         
         {/* </Backdrop> */}
         </div>
        </ListItem>
            )
  
           })
  

        

    // const fetchData = async () => {
    //   try {
    //     // Make an asynchronous request using Axios
    //     const response = await axios.get('10.27.16.235:3000/MQTTdata');
        
    //     // Update state with the received data
    //     setMqttData(response.data);
    //     console.log(response)
    //   } catch (err) {
    //     // Handle errors
    //     setMqttData(err.message);
    //   }
    // };
  
    // useEffect(() => {
    //   // Call the async function within the useEffect
    //   fetchData();
    // }, []);


    // useEffect(()=>{

    //   TotalNumberOfCell.map((DeviceDetails)=>{
    //       if(DeviceDetails.cellName == currentDeviceId){
    //       setCurrentDeviceValue({Temperature:DeviceDetails.cellTemperature, Humidity:DeviceDetails.cellHumitidy, Batterypercentage:DeviceDetails.cellBattery})
    //       }
    //   })
      

    // },[currentDeviceId])

    // const handleCloseAddCell = (value) => {
    //   setopenAddCell(value);
    // };

    // const handleOpenAddCellFromEmpety = (value) => {
    //   setopenAddCell(value);
    // };



    // const AddNewCell=(data)=>{

    //  // console.log("----------"+Object.keys(TotalNumberOfCell).length)

    //   if(Object.keys(TotalNumberOfCell).length >= 1){
    //     setTotalNumberOfCell([...TotalNumberOfCell, data])
        
    //   }else{
    //   setcurrentDeviceId(data.cellName)
    //   setCurrentDeviceValue({Temperature:data.cellTemperature, Humidity:data.cellHumitidy, Batterypercentage:data.cellBattery})
    //   setTotalNumberOfCell([...TotalNumberOfCell, data])
    //   }
    //   setshowEmptyCell(false)
    // }

  return (
    <Content>
    {loader ? <Loader/> : null}
    <Paper elevation={3}  maxWidth="auto"  sx={{backgroundColor:"#000", height:"auto",display:"flex", justifyContent:"flex-start"}}>
    
    <div style={{width:"70px", height:"auto", backgroundColor:"#202028"}}>
    <Grid direction={"column"} justifyContent={"flex-start"} alignItems={"center"}  container>
    {/* <ViewInArIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}  /> */}
    <AccountCircleIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}} />
    {/* <StorageIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/> */}
    <TimelineIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    {/* <DashboardOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <AssignmentOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/> */}
    <NotificationsNoneOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    <BuildOutlinedIcon style={{marginTop:"15px", marginBottom:"15px", fontSize:"35px", color:"#FFF"}}/>
    </Grid>
    
    </div>

    <div style={{width:"100%", minHeight:"100vh", backgroundColor:"#000", height:"100%"}}>

      {/* Header */}
      <div style={{width:"100%", height:"70px", backgroundColor:"#181820", display:"flex", justifyContent:"space-between", alignItems:"center",}}>
      <Typography variant="h5" component="h2" color={"#FFF"}>
       {currentTime}
      </Typography>
      <Typography variant="h4" component="h2" color={"#FFF"} style={{marginRight:"70px"}}>
        Dashboard
      </Typography>



        <img src='./Color logo - no background.svg' alt='logo' width={"200px"} height={"60px"} />
      </div>
      {/* menu bar */}
      {/* <div style={{width:"100%", height:"70px", backgroundColor:"#181820", display:"flex", justifyContent:"right", alignItems:"center"}}> */}
        {/* Buttons */}
        {/* Left Buttons */}
      {/* <div>
      <Button onClick={()=>setopenAddCell(!openAddCell)} style={{margin:"5px", textTransform:"none"}} variant="contained" startIcon={<WidgetsIcon />}>Add Cell</Button>
      <Button style={{margin:"5px", textTransform:"none", backgroundColor:"#393846", color:"#FFF"}} variant="outlined" startIcon={<NotesIcon />}>Add Note</Button>
      <Button style={{margin:"5px", textTransform:"none", backgroundColor:"#9933ff"}} variant="contained" startIcon={<ViewInArIcon />}>Variables</Button>

      </div> */}
      {/* Right Buttons */}
      {/* <div style={{display:"flex",justifyContent:"space-between"}}>
      
      <select style={{width:"130px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", margin:"5px", height:"40px", padding:"5px"}}>
        <option style={{width:"130px"}}>{<DeleteIcon />}Local</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option>
      </select>

      <IconButton><CachedIcon style={{color:"#fff", backgroundColor:"#000", padding:"5px"}}/></IconButton>

      <select style={{margin:"5px",width:"150px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", padding:"5px"}}>
        <option style={{width:"130px"}}>Past 1h</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option>
      </select>
      </div>
      </div>*/}   
      {/* menu end */}
      <div style={{width:"100%", height:"70px", backgroundColor:"#0F0E16", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
      
      

      <Button style={{margin:"5px", textTransform:"none", color:"#9933ff", backgroundColor:"#272030"}} variant="contained" startIcon={<TableRowsIcon />}>IoT_Device</Button>


      <select  onChange={(e)=>setcurrentDeviceId(e.target.value)} style={{margin:"5px",width:"200px", borderRadius:"5px", fontSize:"18px", backgroundColor:"#393846", color:"#FFF", padding:"5px", height:"37px",}}>
        {/* {Object.keys(TotalNumberOfCell).length==0?<option style={{width:"130px"}}>Please Select here</option>:null} */}
        {/* {
          TotalNumberOfCell.map((Device)=>{
            return( */}
              <option value={0} style={{width:"130px"}}>MAC ID 1</option>
              <option value={1} style={{width:"130px"}}>MAC ID 2</option>
              <option value={2} style={{width:"130px"}}>MAC ID 3</option>
              <option value={3} style={{width:"130px"}}>MAC ID 4</option>
              <option value={4} style={{width:"130px"}}>MAC ID 5</option>


            {/* )
          }) */}
        {/* } */}

        {/* <option style={{width:"130px"}}>Virtual_device</option>
        <option style={{width:"130px"}}>Past 2h</option>
        <option style={{width:"130px"}}>Past 3h</option> */}

      </select>
      </div>

      {/* Meter */}


     {/* {openAddCell ?<AddCell Close={handleCloseAddCell} data={AddNewCell}/>:null} 

     {showEmptyCell ? <EmptyCell handleOpenAddCellFromEmpety={handleOpenAddCellFromEmpety} />:null}
      

     {currentDeviceId.length >= 1 ? */}
     <>
     <div style={{marginTop:"20px", margin:"10px"}}>

     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs>
          <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"#0F0E16", padding:"10px"}}>

            <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
            <CalendarViewDayIcon fontSize="large"/>
            <Typography variant='h6'>Actual Temperature</Typography>
            </Grid>

            <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
            <SettingsApplicationsIcon fontSize="large"/>
            </Grid>
          </Grid>
          <Item>

          {/* <Meter data={regex.exec(tempMQTT)}/> */}
          <AnimationPieChart data={regex.exec(tempMQTT)}/>
          </Item>
        </Grid>
        <Grid item xs={4}>
        <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"#0F0E16", padding:"10px"}}>

          <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
          <CalendarViewDayIcon fontSize="large"/>
          <Typography variant='h6'>Actual Humidity</Typography>
          </Grid>

          <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
          <SettingsApplicationsIcon fontSize="large"/>
          </Grid>


          </Grid>
          <Item >
            {/* <HumidityMeter data={regex.exec(humidtyMQTT)} /> */}
            <AmimationHumPiechart data={regex.exec(humidtyMQTT)}/>
            </Item>
        </Grid>
        <Grid item xs={4}>
        <Grid style={{display:"flex", justifyContent:"space-between", alignItems:"center", color:"#FFF", backgroundColor:"#0F0E16", padding:"10px", borderTopLeftRadius:"5px", borderTopRightRadius:"15px"}}>

        <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
        <BatteryFullIcon fontSize="large" style={{transform: "rotate(90deg)", marginRight:"10px"}}/>
        <Typography variant='h6'>Battery</Typography>
        </Grid>

        <Grid style={{justifyContent:"space-around", display:"flex", alignItems:"center"}}>
        <SettingsApplicationsIcon fontSize="large"/>
        </Grid>

        </Grid>
          <ItemBattery>
            {/* regex.exec() */}
            <Grid >
          {/* <Battery data={vbattMQTT}/> */}
         <BatterUI data={vbattMQTT} batteryempty={vbattaMQTTBalance}/> 
          </Grid>
          </ItemBattery>
        </Grid>
        {/* Second row */}
        <Grid item xs={4}>
        <div sx={{height:"100%", width:"100%",}} onClick={()=>setopenTemperature(!openTemperature)}>
          <LinechartGraph >

          <TemperartureMiniChart/>
          <div style={{backgroundColor:"#0F0E16", height:"15px", width:"80px", position:"relative", top:"-18px", left:"470px"}}></div>
            </LinechartGraph>
            </div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#00000011" }}
              open={openTemperature}
              
            >
       <Box sx={{height:"500px", width:"80vw", backgroundColor:"#0F0E16", marginTop:"10%",}}>
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", backgroundColor:"#0F0E16"}}>
          <IconButton style={{ backgroundColor:"#0F0E16"}}>
          <CloseIcon onClick={()=>setopenTemperature(!openTemperature)} sx={{color:"#FFF"}}/>
          </IconButton></div>
      <LineChart/>
      <div style={{backgroundColor:"#0F0E16", height:"15px", width:"80px", position:"relative", top:"-19px", left:"94.4%"}}></div>

       </Box>
      </Backdrop>
        </Grid>
        {/* 2 */}
        <Grid item xs={4}>
        <div sx={{height:"100%", width:"100%"}} onClick={()=>setopenHumidity(!openHumidity)}>
          <LinechartGraph >

          <HumidityMiniChart/>
          <div style={{backgroundColor:"#0F0E16", height:"15px", width:"80px", position:"relative", top:"-18px", left:"470px"}}></div>

            </LinechartGraph>
            </div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#00000011" }}
              open={openHumidity}
              
            >
       <Box sx={{height:"500px", width:"80vw", backgroundColor:"#0F0E16", marginTop:"10%",}}>
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", backgroundColor:"#0F0E16"}}>
          <IconButton>
          <CloseIcon onClick={()=>setopenHumidity(!openHumidity)}  sx={{color:"#FFF"}}/>
          </IconButton></div>
      <HumidityLineChart/>
      <div style={{backgroundColor:"#0F0E16", height:"15px", width:"80px", position:"relative", top:"-19px", left:"94.4%"}}></div>

       </Box>
      </Backdrop>
        </Grid>
        {/* 3 */}
        <Grid item xs={4}>
          <LinechartGraph >

          {/* <AlertNotification Alertlist={alertListTemplate}/> */}
        <List
      sx={{
        width: '100%',
        minWidth: 360,
        bgcolor: 'background.paper',
        backgroundColor:"#0F0E16",
        position: 'relative',
        overflow: 'auto',
        minHeight: "100%",
        height:"100%",
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    > 
    {alertListTemplate}
    </List>


            </LinechartGraph>
            <ALertTemplate/>
        </Grid>

      </Grid>
    </Box>
    
     </div>

      {/* <div style={{backgroundColor:"#FFF", margin:"10px"}}>
        <LineChart />
      </div> */}
      </>

      {/* :null } */}
      


    </div>    
    
    </Paper>    
    </Content>
  );
}

export default App;
//<Meter/>