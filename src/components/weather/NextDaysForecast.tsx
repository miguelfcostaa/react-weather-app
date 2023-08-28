import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Data from '../../types/Data.type';
import Forecastday from '../../types/Forecastday.type';
import { Link } from 'react-router-dom';




export default function NextDaysForecast(props: any) {

    const handleMoreInfo = () => {
        
    }

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    });

    
    async function getWeatherInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: props.city,
                days: 7
            }
        })
        return response.data;
    }


    return(
        <>
            <div className='flexForecastCards'>
            {weatherInfo?.forecast?.forecastday?.map((data: Forecastday) => 
                <Card className='forecastCard' onClick={handleMoreInfo} sx={{ boxShadow: 5, borderRadius: 2, transition: 'transform 1s, width 1s, height 1s' }}>
                        <CardContent className='forecastCardCont'>
                            <Link 
                                to={"/search/" + props.city + "/" + data.date} 
                                style={{ color: 'black', textDecoration: 'none'}}
                            >
                                <Typography sx={{ fontSize: 18, width: 180, textAlign: 'center', paddingRight: 2 }}>
                                    {data.date}
                                </Typography>

                                <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center', paddingTop: 5, paddingRight: 2  }}>
                                    {data.day.avgtemp_c} ºC
                                </Typography>

                                <img alt='' src={data.day.condition.icon} width={120} height={120} className='forecastImages' />

                                <Typography sx={{ fontSize: 24, width: 180, textAlign: 'center', paddingRight: 2  }}>
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