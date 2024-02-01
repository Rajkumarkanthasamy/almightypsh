import React from "react";
import { useTheme } from "@mui/material";
import { color } from "d3-color";

import LiquidFillGauge from "react-liquid-gauge";

function BatteryUI(props) {
  

  return (
    <LiquidFillGauge
      style={{ margin: "0 auto" }}
      width={150 * 2}
      height={150 * 2}
      value={props.data}
      percent={"%"}
      textSize={1}
      textOffsetX={10}
      textOffsetY={30}
      riseAnimation
      waveAnimation
      waveFrequency={2}
      waveAmplitude={1}
      gradient
      outerRadius={0.94}
      circleStyle={{
        fill: "#03fc98",//00A249
      }}
      waveStyle={{
        fill: "#03fc9844",
      }}
      textStyle={{
        fill: color("#444").toString(),
        fontFamily: "Arial",
      }}
      waveTextStyle={{
        fill: color("#fff").toString(),
        fontFamily: "Arial",
      }}
    />
  );
}

export default BatteryUI;