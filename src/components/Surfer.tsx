import React, { useRef, useEffect, useState } from "react";

interface SurferProps {
  x: number;
  y: number;
  image: HTMLImageElement | null;
}

const Surfer: React.FunctionComponent<SurferProps> = (props) => (
  <img
    src={props.image?.src}
    style={{
      position: "absolute",
      left: props.x,
      top: props.y,
      width: props.image?.width,
      height: props.image?.height,
    }}
  />
);

export default Surfer;
