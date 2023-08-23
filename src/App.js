import "./index.css";
import SearchField from "./components/SearchField.tsx";
import NavBar from "./components/NavBar.tsx";
import Filters from "./components/Filters.tsx";
import Weather from "./components/weather/Weather.tsx";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchField />
      <Weather />
    </div>
  );
}

export default App;
