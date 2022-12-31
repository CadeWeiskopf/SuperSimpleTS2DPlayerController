import "./App.css";
import WaveCanvas from "./components/WaveCanvas";

function App() {
  return (
    <div className="App">
      <WaveCanvas width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
}

export default App;
