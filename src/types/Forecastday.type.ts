import Hour from "./Hour.type";

export default interface Forecastday {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        daily_chance_of_rain: number;
        condition: {
            text: string;
            icon: string;
        }
        maxwind_kph: number;
        uv: number;
    }
    uv: number;
    hour: Hour[];
}
