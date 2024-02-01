import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ListItemButton from '@mui/material/ListItemButton';
//import "./AlertNotification.css"
import {Button, IconButton, Box, Grid} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';


export default function AlignItemsList(props) {

  const [openAlert, setopenAlert] = React.useState(false);
  
  var list = props.AlertList

  const [AlertList, setAlertList] = React.useState([props.AlertList])
 
  return (
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
         {
          props.Alertlist
         }
         </List>
  );
}



//  AlertList.map((DeviceDetails) => {
//   console.log("Header.Header", JSON.stringify(DeviceDetails) )
//           return(

//       <ListItem alignItems="flex-start" >
//       <ListItemButton  className='NOtificationAlert' 
//       onClick={()=>setopenAlert(true)}
//       sx={{color:"#FFF", backgroundColor:"#e6d92a67", borderRadius:"10px", position:"relative"}}>
//       <ListItemAvatar>
//           <CircleNotificationsIcon sx={{ fontSize: 40, color:"#f89406" }} />
//         </ListItemAvatar>
//         <ListItemText
//           primary="High Temperature"
//           style={{color:"#FFF"}}
//           secondary={
//             <React.Fragment >
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="#FFF"
//               >
//                 Ali Connors
//                 — I'll be in your neighborhood doing errands this…
//               </Typography>
             
//             </React.Fragment>
//           }
          
//         />
//          </ListItemButton>
//          <div>
//         <Backdrop
//               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#00000001" }}
//               open={openAlert}
              
//             >
//        <Box sx={{height:"500px", width:"600px", backgroundColor:"#272822", marginTop:"20%", borderRadius:"21px", marginLeft:"15%"}}>
//         <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", backgroundColor:"#272822",  borderRadius:"21px"}}>
//           <IconButton style={{ backgroundColor:"#0F0E16"}}>
//           <CloseIcon onClick={()=>setopenAlert(!openAlert)} sx={{color:"#FFF"}}/>
//           </IconButton></div>
//           <ListItemText
//           // primary="High Temperature"
//           style={{color:"#FFF", paddingLeft:"1%", paddingRight:"1%"}}
//           secondary={
//             dataTemplate()
//           }
//         />

     
//        </Box>
//        </Backdrop>
//        </div>
//       </ListItem>
//           )

//          })
