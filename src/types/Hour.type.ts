export default interface Hour {
    time: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    }
    wind_kph: number;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
    chance_of_rain: number;
    uv: number;
}