import React, { useState } from 'react'
import {Button, IconButton, Typography, Box, Grid} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
function ALertTemplate(props) {

    const [openAlert, setopenAlert] = useState(false);
    
  return (
    <div>
        <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#00000011" }}
              open={openAlert}
              
            >
       <Box sx={{height:"300px", width:"400px", backgroundColor:"#0F0E16", marginTop:"20%",}}>
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", backgroundColor:"#0F0E16"}}>
          <IconButton style={{ backgroundColor:"#0F0E16"}}>
          <CloseIcon onClick={()=>setopenAlert(!openAlert)} sx={{color:"#FFF"}}/>
          </IconButton></div>
     
       </Box>
       </Backdrop>
       </div>

  )
}

export default ALertTemplate