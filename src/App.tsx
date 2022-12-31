import "./App.css";
import WaveCanvas from "./components/WaveCanvas";

function App() {
  return (
    <div className="App">
      <WaveCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        waveAmplitude={80}
        waveFrequency={100}
        animationDuration={1000}
      />
    </div>
  );
}

export default App;
