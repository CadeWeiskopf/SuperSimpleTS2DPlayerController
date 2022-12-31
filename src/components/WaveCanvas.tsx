import { useRef, useEffect } from "react";

interface WaveProps {
  width: number;
  height: number;
}

const drawSineWave = (context: CanvasRenderingContext2D) => {
  context.beginPath();
  context.lineWidth = 2;

  let x = 0;
  let y = 0;
  const amplitude = 80;
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
      y = height / 2 + amplitude * Math.sin(x / frequency);
    }
    context.lineTo(x, y);
    x = x + 1;
  }
  context.stroke();
};

const WaveCanvas: React.FunctionComponent<WaveProps> = (props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current === null) {
      return;
    }
    const context = canvas.current.getContext("2d");
    if (context === null) {
      return;
    }

    // game stuff here
    drawSineWave(context);

    const resizeListener = () => {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
      drawSineWave(context);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  return <canvas ref={canvas} width={props.width} height={props.height} />;
};

export default WaveCanvas;
