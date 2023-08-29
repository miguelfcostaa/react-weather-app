import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import Data from '../types/Data.type';
import Forecastday from '../types/Forecastday.type';
import NavBar from './NavBar';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Hour from '../types/Hour.type';

export default function AfterSearch() {

    let params = useParams();

    console.log("field",params.field);
    console.log("date",params.date);
    console.log("hour",params.hour);
    console.log("days",params.ndays);


    const [weatherInfo, setWeatherInfo] = useState<Data>();

    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: params.field,
                days: params.ndays ?? 7,
                dt: params.date,
                hour: params.hour ?? ''
            }
        })
        return response.data;
    }
    
    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    });


    return(
        <>
            <NavBar />

            <div className='row' style={{ marginRight: 0 }}>
                <div className='col-4'>
                    <Card className='afterSearchCurrentDay' sx={{ boxShadow: 5, borderRadius: 2}}>
                        <CardContent className='afterSearchCurrentDayCont'>

                            <Typography>
                                <img alt='' src={weatherInfo?.current.condition.icon} width={180} height={180} style={{padding: 10}}/>
                            </Typography>   

                            <Typography className='locationAndTemp' sx={{ fontSize: 34, width: 250, padding: 3 }} >
                                <p style={{ fontWeight: 'bold'}}> {weatherInfo?.location.name}</p>
                                {weatherInfo?.current.temp_c}ºC
                            </Typography>

                            <Typography sx={{ fontSize: 26, width: 400, padding: 3, paddingTop: 1, paddingBottom: 4 }}>
                                {weatherInfo?.current.condition.text}
                            </Typography>

                            <Typography className="humidity" sx={{ fontSize: 24, width: 220, paddingLeft: 2}}>
                                <WaterDropIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.current.humidity} %
                            </Typography>

                            <Typography sx={{ fontSize: 24, width: 210, paddingLeft: 2 }} >
                                <ThermostatIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.current.feelslike_c} ºC
                            </Typography>

                            <Typography sx={{ fontSize: 24, width: 220, paddingLeft: 2 }} >
                                <AirIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.current.wind_kph} mph
                            </Typography>

                            <Typography sx={{ fontSize: 24, width: 210, paddingLeft: 2 }} >
                                <WbSunnyIcon sx={{ verticalAlign: 'middle'}}/> {weatherInfo?.current.uv} UV
                            </Typography>

                            
                        </CardContent>
                    </Card>
                </div>
                <div className='col-8'>
                <Card className="hourForecast" sx={{ fontSize: 16, boxShadow: 5, borderRadius: 2 }}>
                    <CardContent className='hourForecastCont'>
                        {weatherInfo?.forecast?.forecastday[0].hour.map((data: Hour) => 
                            <div className='row'>
                            
                                <Typography className='col-2' sx={{ textAlign: 'center' }}>
                                    {data.time}
                                </Typography>

                                <Typography className='col-1'>
                                    <img alt='' src={data.condition.icon} width={30} height={30} />
                                </Typography>   

                                <Typography className='col-1'>
                                    {data.temp_c}ºC
                                </Typography>

                                <Typography className='col-2'>
                                    <WaterDropIcon sx={{ verticalAlign: 'middle'}}/> {data.chance_of_rain}%
                                </Typography>

                                <Typography className='col-2'>
                                    <ThermostatIcon sx={{ verticalAlign: 'middle'}}/> {data.feelslike_c}ºC
                                </Typography>

                                <Typography className='col-2'>
                                    <AirIcon sx={{ verticalAlign: 'middle'}}/> {data.wind_kph}km/h
                                </Typography>

                                <Typography className='col-2' sx={{  paddingBottom: 2}} >
                                    <WbSunnyIcon sx={{ verticalAlign: 'middle'}}/>  {data.uv} UV
                                </Typography>
                                <hr></hr>
                            </div>   
                        )}     
                    </CardContent>
                </Card>
                </div>
            </div>

            <div className='flexForecastCards'>
            {weatherInfo?.forecast?.forecastday?.map((data: Forecastday) => 
                <Card className='forecastCard' sx={{ marginTop: 5, boxShadow: 5, borderRadius: 2, transition: 'transform 1s, width 1s, height 1s' }}>
                        <CardContent className='forecastCardCont'>
                            <Link 
                                to={"/search/" + params.field + "/" + data.date} 
                                style={{ color: 'black', textDecoration: 'none'}}
                            >
                            
                            <Typography sx={{ fontSize: 18, width: 180, textAlign: 'center' }}>
                                {data.date}
                            </Typography>

                            <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center', paddingTop: 5 }}>
                                {data.day.avgtemp_c} ºC
                            </Typography>

                            <img alt='' src={data.day.condition.icon} width={110} height={110} className='forecastImages' />

                            <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center' }}>
                                {data.day.condition.text}
                            </Typography>

                            </Link>
                        </CardContent>
                </Card>
            )}
            </div>                
        </>
    );
}
