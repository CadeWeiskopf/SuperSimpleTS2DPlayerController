import React, { useRef, useEffect, useState } from "react";

interface WaveProps {
  width: number;
  height: number;
  waveAmplitude: number; // control wave size
  waveFrequency: number; // control wave speed
  animationDuration: number; // control animation speed
}

const WaveCanvas: React.FunctionComponent<WaveProps> = (props) => {
  const [xOffset, setXOffset] = useState<number>(0);
  let startTime: number = 0;

  const canvas = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const drawSineWaveWithAnimationFrame = (
    context: CanvasRenderingContext2D,
    xOffset: number
  ) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.lineWidth = 2;
    let x = 0;
    let y = 0;
    const { waveAmplitude, waveFrequency } = props;
    const width = context.canvas.width;
    const height = context.canvas.height;
    const waveZone = {
      start: 0, //context.canvas.width / 8,
      end: context.canvas.width, //context.canvas.width - context.canvas.width / 8,
    };
    while (x < width) {
      if (x < waveZone.start || x > waveZone.end) {
        y = height / 2;
      } else {
        y = height / 2 + waveAmplitude * Math.sin(x / waveFrequency - xOffset);
      }
      context.lineTo(x, y);
      x = x + 1;
    }
    context.stroke();

    // do water
    context.fillStyle = "blue";
    context.lineTo(width, height); // draw a line to the bottom right corner of the canvas
    context.lineTo(0, height); // draw a line to the bottom left corner of the canvas
    context.lineTo(0, y); // draw a line back to the starting point
    context.fill(); // fill the are

    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const t = elapsedTime / props.animationDuration;
    const newXOffset = xOffset + t;
    startTime = currentTime;
    if (elapsedTime < props.animationDuration) {
      animationIdRef.current = window.requestAnimationFrame(() =>
        drawSineWaveWithAnimationFrame(context, newXOffset)
      );
    } else {
      animationIdRef.current = window.requestAnimationFrame(() =>
        drawSineWaveWithAnimationFrame(context, xOffset)
      );
    }
  };

  useEffect(() => {
    if (canvas.current === null) {
      return;
    }
    const context = canvas.current.getContext("2d");
    if (context === null) {
      return;
    }

    startTime = Date.now();

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // start the animation
    animationIdRef.current = window.requestAnimationFrame(() =>
      drawSineWaveWithAnimationFrame(context, xOffset)
    );

    const resizeListener = () => {
      window.cancelAnimationFrame(animationIdRef.current); // reset theanimationId to 0
      animationIdRef.current = 0;
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
      drawSineWaveWithAnimationFrame(context, xOffset);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.cancelAnimationFrame(animationIdRef.current);
    };
  }, [
    xOffset,
    props.animationDuration,
    props.waveAmplitude,
    props.waveFrequency,
  ]);

  return <canvas ref={canvas} width={props.width} height={props.height} />;
};

export default WaveCanvas;
