import React from 'react'
import GaugeComponent from 'react-gauge-component'

function Piechart(props) {


    const kbitsToMbits = (value) => {
        if (value >= 1000) {
          value = value / 1000;
          if (Number.isInteger(value)) {
            return value.toFixed(0) + ' mbit/s';
          } else {
            return value.toFixed(1) + ' mbit/s';
          }
        } else {
          return value.toFixed(0) + ' %';
        }
      }

  return (
    <div style={{marginTop:"100px"}}>
    <div style={{backgroundColor:"#0F0E16", width:"40px", height:"20px", position:"relative", top:"285px", left:"50px"}}></div>
    <div style={{backgroundColor:"#0F0E16", width:"43px", height:"20px", position:"relative", top:"263px", left:"366px"}}></div>

      <div style={{ width: 450, height: 450 }}>
        <GaugeComponent value={props.data} 

arc={{
    nbSubArcs: 150,
    colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
    width: 0.3,
    padding: 0.003
  }}
  labels={{
    valueLabel: {
      fontSize: 40,
      formatTextValue: kbitsToMbits
    },
    tickLabels: {
      type: "outer",
    //   valueConfig: {
    //     formatTextValue: kbitsToMbits
    //   }
    }
  }}
        
        //  arc={{
        //     subArcs: [
        //       {
        //         // limit: 20,
        //         color: '#5BE12C',
        //         // showTick: true 5BE12C
        //       },
        //       {
        //         // limit: 40,
        //         color: '#F5CD19',
        //         // showTick: true F5CD19
        //       },
        //       {
        //         // limit: 60,
        //         color: '#F58B19',
        //         // showTick: true F58B19
        //       },
        //       {
        //         // limit: 100,
        //         color: '#EA4228',
        //         // showTick: true EA4228
        //       },
        //     ],
        //   }}
        />
      </div>
    </div>
  )
}

export default Piechart