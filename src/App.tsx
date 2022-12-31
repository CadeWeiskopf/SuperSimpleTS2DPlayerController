import { useEffect, useState } from "react";
import "./App.css";
import Surfer from "./components/Surfer";
import WaveCanvas from "./components/WaveCanvas";

function App() {
  const [characterImage, setCharacterImage] = useState<HTMLImageElement | null>(
    null
  );
  useEffect(() => {
    const image = new Image();
    image.src = "/surf.png";
    image.onload = () => {
      setCharacterImage(image);
    };
  }, []);
  return (
    <div className="App">
      <WaveCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        waveAmplitude={80}
        waveFrequency={100}
        animationDuration={1000}
      />
      <Surfer x={266} y={266} image={characterImage} />
    </div>
  );
}

export default App;
