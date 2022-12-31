import { useRef, useEffect, useState } from "react";

interface WaveProps {
  width: number;
  height: number;
}
let drawing = false;
const drawSineWave = (context: CanvasRenderingContext2D, xOffset: number) => {
  drawing = true;
  context.beginPath();
  context.lineWidth = 2;

  let x = xOffset;
  let y = 0;
  let amplitude = 80;
  const frequency = 70;
  const width = context.canvas.width;
  const height = context.canvas.height;
  const waveZone = {
    start: context.canvas.width / 4,
    end: context.canvas.width - context.canvas.width / 4,
  };
  //let smoothedStart: boolean = false;
  //let smoothedEnd: boolean = false;
  while (x < width) {
    if (x < waveZone.start || x > waveZone.end) {
      y = height / 2;
    } else {
      y = height / 2 + amplitude * Math.sin(x / frequency - xOffset);
    }
    context.lineTo(x, y);
    x = x + 1;
  }
  context.stroke();
  drawing = false;
};

const WaveCanvas: React.FunctionComponent<WaveProps> = (props) => {
  const [xOffset, setXOffset] = useState<number>(0);
  let handleXOffsetIntervalId: number = 0;
  const handleUpdateXOffset = () => {
    handleXOffsetIntervalId = Number(
      setInterval(() => {
        setXOffset((prevOffsetX) => prevOffsetX + 1);
      }, 100)
    );
  };
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current === null) {
      return;
    }
    const context = canvas.current.getContext("2d");
    if (context === null) {
      return;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // game stuff here
    drawSineWave(context, xOffset);
    handleUpdateXOffset();

    const resizeListener = () => {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
      drawSineWave(context, xOffset);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      clearInterval(handleXOffsetIntervalId);
    };
  }, [xOffset]);
  return <canvas ref={canvas} width={props.width} height={props.height} />;
};

export default WaveCanvas;
