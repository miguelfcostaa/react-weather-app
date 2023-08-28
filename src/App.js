import "./index.css";
import SearchField from "./components/SearchField.tsx";
import NavBar from "./components/NavBar.tsx";
import NextDaysForecast from "./components/weather/NextDaysForecast.tsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchField city="32.6789267,-17.0599522" />
      <NextDaysForecast city="32.6789267,-17.0599522" />
    </div>
  );
}

export default App;
