import axios from "axios";
import Data from "../types/Data.type";

const URL_FORECAST = 'https://api.weatherapi.com/v1/forecast.json'

const findByField = (field: string) => {
    return axios.get(URL_FORECAST, {
        params: {
            key: process.env.REACT_APP_API_KEY,
            q: field,
            days: 7
        }
    })
}