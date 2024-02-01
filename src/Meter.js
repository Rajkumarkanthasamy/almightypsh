import ReactSpeedometer from "react-d3-speedometer"
import GaugeComponent from 'react-gauge-component'


const Speedometer=(props)=>{


    const kbitsToMbits = (value) => {
        if (value >= 1000) {
          value = value / 1000;
          if (Number.isInteger(value)) {
            return value.toFixed(0) + 'ºC';
          } else {
            return value.toFixed(1) + ' ºC';
          }
        } else {
          return value.toFixed(0) + 'ºC';
        }
      }


    return(
        <GaugeComponent
        
        style={{backgroundColor:"#0F0E16", width:"80%",height:"80%"}}
       type="radial"

       labels={{
        valueLabel: {
          fontSize: 40,
          formatTextValue: kbitsToMbits
        },
        tickLabels: {
          type: "outer",
          ticks: [
            { value: 10 },
            { value: 20 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
            { value: 60 },
            { value: 70 },
            { value: 80 },
            { value: 90 },
            { value: 100 },
           
          ],
          valueConfig: {
            formatTextValue: kbitsToMbits
          }
        }
      }}

      
      arc={{
        nbSubArcs: 150,
        colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
        width: 0.3,
        padding: 0.003
      }}

       value={props.data}
     />
    )
}

export default Speedometer;