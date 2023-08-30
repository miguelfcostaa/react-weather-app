import Forecastday from "./Forecastday.type";

export default interface Data {
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
        wind_kph: number;
        feelslike_c: number;
        humidity: number;
        uv: number;
    }
    forecast: {
        forecastday: Forecastday[];
    }
    location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
        lat: number;
        lon: number;
    }
}