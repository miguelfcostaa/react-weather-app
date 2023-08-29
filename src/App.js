import "./index.css";
import SearchField from "./components/SearchField.tsx";
import NavBar from "./components/NavBar.tsx";
import NextDaysForecast from "./components/weather/NextDaysForecast.tsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchField city="Funchal" />
      <NextDaysForecast city="Funchal" />
    </div>
  );
}

export default App;
