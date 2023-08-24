import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Data from '../../types/Data.type';
import Forecastday from '../../types/Forecastday.type';


async function getWeatherInfo(): Promise<any> {
    const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
        params: {
            key: process.env.REACT_APP_API_KEY,
            q: 'Madeira',
            days: 7
        }
    })
    console.log("7DAY - RESPOSTA: ", response.data);
    return response.data;
}

export default function NextDaysForecast() {

    const handleMoreInfo = () => {
        
    }

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    }, []);

    console.log("7day - DEPOIS DE USAR NO USE-STATE", weatherInfo )

    return(
        <>
            <div className='flexForecastCards'>
            {weatherInfo?.forecast?.forecastday?.map((data: Forecastday) => 
                <Card className='forecastCard' onClick={handleMoreInfo} sx={{ boxShadow: 5, borderRadius: 4, transition: 'transform 1s, width 1s, height 1s' }}>
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