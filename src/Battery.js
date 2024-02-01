import BatteryGauge from 'react-battery-gauge'

const Battery=(props)=>{

    return(
        <BatteryGauge value={props.data} vectorEffect={8} animated={true} 
        charging={false}
        
        
        
        />
    )
}

export default Battery;