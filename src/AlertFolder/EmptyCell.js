import React from 'react'
import {Button, IconButton, Typography, Box, Grid} from '@mui/material';
import WidgetsIcon from '@mui/icons-material/Widgets';
import  './EmptyCellCss.css'

function EmptyCell(props) {
  return (
    <div style={{color:"#FFF", display:"flex", justifyContent:"center", alignItems:"center", height:"300px"}}>
        <Grid container direction={"column"} justifyContent={"space-around"} alignItems={"center"} style={{height:"200px"}}>
        <Typography style={{fontWeight:"bolder"}} variant='h2'>Empty Cell !</Typography>
        <Typography className='animationText' style={{fontWeight:"bolder"}} variant='h3'>⬇</Typography>
      <Button onClick={()=>props.handleOpenAddCellFromEmpety(true)} style={{margin:"5px", textTransform:"none"}} variant="contained" startIcon={<WidgetsIcon />}>Click here to create Cell</Button>
        </Grid>
    </div>
  )
}

export default EmptyCell