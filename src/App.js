import "./index.css";
import "leaflet/dist/leaflet.css";
import SearchField from "./components/SearchField.tsx";
import NavBar from "./components/NavBar.tsx";
import NextDaysForecast from "./components/weather/NextDaysForecast.tsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchField city="Funchal" country="Portugal" />
      <NextDaysForecast city="Funchal" country="Portugal" />
    </div>
  );
}

export default App;
