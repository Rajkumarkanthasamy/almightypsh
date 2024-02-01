import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Box,  Toolbar, AppBar, ListItem, IconButton,Typography, Button,Backdrop, Grid, TableCell, Divider, Table, TableFooter, TableBody, TextField, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@mui/material';
import dayjs from 'dayjs';


export default function BasicDateTimePicker(props) {

    
    
    const [startTime, setstartTime] = React.useState(null)
    const [endTime, setendTime]= React.useState(null)

    React.useEffect(()=>{
      setstartTime()
    }, [])

    const currentDate = new Date(startTime)
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currenttime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    
    // console.log(startTime)
    //  console.log(endTime)

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"right", backgroundColor:"#0F0E16", color:"#fff", color:"#FFF", marginRight:"10px"}}>
       
        <Grid>
    <LocalizationProvider sx={{backgroundColor:"#fff"}} dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DateTimePicker']}>
        <DateTimePicker
         
          value={startTime}
          sx={{backgroundColor:"#56507c", borderRadius:"10px", color:"#FFF"}}
          onChange={(newValue) => setstartTime(UpdateTimeFormat(newValue))} 
          label="" />
      </DemoContainer>
    </LocalizationProvider>
    </Grid>
    <Grid sx={{margin:"10px", marginTop:"12px", fontSize:"30px"}}>
        :
    </Grid>
    <Grid>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer defaultValue={dayjs('2022-04-17T15:30')}  components={['DateTimePicker']}>
         <DateTimePicker 
         className='custom-background'
         value={endTime}
         sx={{backgroundColor:"#56507c", borderRadius:"10px", color:"#FFF"}}
         onChange={(newValue) =>{ 
          setendTime(UpdateTimeFormat(newValue))
          props.fetchRangedata(startTime, UpdateTimeFormat(newValue))
        }} 
         label=""
         defaultValue={dayjs('2022-04-17T15:30')}
         />
       </DemoContainer>
     </LocalizationProvider>
     </Grid>
     <Grid>
            {/* <Button variant='contained' style={{ fontSize:"20px",height:"40px", width:"120px", margin:"10px", marginTop:"20px", backgroundColor:"#56507c", color:"#000", textTransform:"none"}} 
            onClick={()=>props.fetchRangedata(startTime, endTime)}>Filter</Button> */}
        </Grid>
     </div>
  );
}


const UpdateTimeFormat=(time)=>{
    const currentDate = new Date(time)
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currenttime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return currenttime
}

