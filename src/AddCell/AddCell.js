import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Button, IconButton, Typography, Box, Grid, CardContent, CardActions, Card, TextField, Stack} from '@mui/material';


function AddCell(props) {

    const [open, setOpen] = React.useState(true);

    const [cellData, setcellData] =useState({cellName:"", cellTemperature:"", cellHumitidy:"", cellBattery:""})
   
    const handleClose = () => {
        props.Close(false)
    };

    const AddNewCell=()=>{
        props.data(cellData)
        handleClose()
        setcellData({cellName:"", cellTemperature:"", cellHumitidy:"", cellBattery:""})
    }
  
    return (
      <>
      <Grid >
        </Grid>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Card sx={{ width: 350, height:450 }}>
      <CardContent>
        <Typography sx={{textAlign:"center", fontWeight:"bolder", marginBottom:"20px" }} variant='h4'  >
          Create Cell
        </Typography>

        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} container spacing={2}>

         <TextField onChange={(e)=>setcellData({...cellData, cellName:e.target.value})} id="outlined-basic" label="Cell Name" variant="outlined" />
         <TextField onChange={(e)=>setcellData({...cellData, cellTemperature:e.target.value})} id="outlined-basic" label="Temperature" variant="outlined" />
         <TextField onChange={(e)=>setcellData({...cellData, cellHumitidy:e.target.value})} id="outlined-basic" label="Humidity" variant="outlined" />
         <TextField onChange={(e)=>setcellData({...cellData, cellBattery:e.target.value})} id="outlined-basic" label="Battery" variant="outlined" />

        </Stack>
        
      </CardContent>
   
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} container spacing={0.5}>

        <Button size="full" onClick={handleClose} variant="contained" style={{ backgroundColor: 'purple', width:"110px" }}>cancel</Button>
        <Button size="full" onClick={AddNewCell} variant="contained" style={{ backgroundColor: 'purple', width:"110px" }}>Add cell</Button>
        </Stack>
      
    </Card>


        </Backdrop>
      </>
    );
}

export default AddCell