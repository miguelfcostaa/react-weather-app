import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Data from '../types/Data.type';
import Forecastday from '../types/Forecastday.type';
import NavBar from './NavBar';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Hour from '../types/Hour.type';

export default function AfterSearch() {

    let params = useParams();

    const fieldPassed = params.field;

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: fieldPassed,
                days: 7
            }
        })
        return response.data;
    }
    
    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    }, []);


    return(
        <>
            <NavBar />

            <div style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap'}}>
                <Card className='afterSearchCurrentDay' sx={{ background: 'transparent', boxShadow: 5, borderRadius: 4, marginTop: 5, marginLeft: 35}}>
                    <CardContent className='afterSearchCurrentDayCont'>

                        <Typography>
                            <img src={weatherInfo?.current.condition.icon} width={150} height={150} />
                        </Typography>   

                        <Typography sx={{ fontSize: 28, width: 250, padding: 3, textAlign: 'right' }} >
                        {weatherInfo?.current.temp_c}ºC
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 400, padding: 3, paddingTop: 0 }}>
                            {weatherInfo?.current.condition.text}
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 130, paddingLeft: 3 }} >
                            <ThermostatIcon /> {weatherInfo?.current.feelslike_c} ºC
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 140, paddingLeft: 3 }} >
                            <AirIcon /> {weatherInfo?.current.wind_kph} mph
                        </Typography>

                        <Typography sx={{ fontSize: 24, width: 50, paddingLeft: 3 }} >
                            <WbSunnyIcon /> {weatherInfo?.current.uv} 
                        </Typography>

                        
                    </CardContent>
                </Card>
                
                <Card className="hourForecast" sx={{ background: 'transparent', boxShadow: 5, borderRadius: 4, marginTop: 5, marginLeft: 10}}>
                    <CardContent className='hourForecastCont'>
                        {weatherInfo?.forecast?.forecastday[0].hour.map((data: Hour) => 
                            <>
                            
                                <Typography>
                                    <img src={data.condition.icon} width={30} height={30} />
                                </Typography>   

                                <Typography sx={{ fontSize: 14 }} >
                                    {data.temp_c} ºC
                                </Typography>

                                <Typography sx={{ fontSize: 14 }}>
                                    {data.chance_of_rain}
                                </Typography>

                                <Typography sx={{ fontSize: 14 }} >
                                    <ThermostatIcon /> {data.feelslike_c} ºC
                                </Typography>

                                <Typography sx={{ fontSize: 14 }} >
                                    <AirIcon /> {data.wind_kph} km/h
                                </Typography>

                                <Typography sx={{ fontSize: 10 }} >
                                    <WbSunnyIcon /> {data.uv} 
                                </Typography>

                            </>   
                        )}     
                    </CardContent>
                </Card>
            </div>

            <div className='flexForecastCards'>
            {weatherInfo?.forecast?.forecastday?.map((data: Forecastday) => 
                <Card className='forecastCard' sx={{background: 'transparent', boxShadow: 5, borderRadius: 4, transition: 'transform 1s, width 1s, height 1s' }}>
                        <CardContent className='forecastCardCont'>

                            
                            <Typography sx={{ fontSize: 18, width: 180, textAlign: 'center' }}>
                                {data.date}
                            </Typography>

                            <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center', paddingTop: 5 }}>
                                {data.day.avgtemp_c} ºC
                            </Typography>

                            <img src={data.day.condition.icon} width={110} height={110} className='forecastImages' />

                            <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center' }}>
                                {data.day.condition.text}
                            </Typography>

                        
                        </CardContent>
                </Card>
            )}
            </div>                
        </>
    );
}
