import "./index.css";
import SearchField from "./components/SearchField.tsx";
import NavBar from "./components/NavBar.tsx";
import Filters from "./components/Filters.tsx";
import Weather from "./components/weather/Weather.tsx";
import NextDaysForecast from "./components/weather/NextDaysForecast.tsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchField />
      <NextDaysForecast />
    </div>
  );
}

export default App;
