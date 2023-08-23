import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Forecastday = {
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
    }
    uv: number;
    hour: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
        precip_mm: number;
        humidity: number;
        feelslike_c: number;
        chance_of_rain: number;
        uv: number;
    }
}

type Hour = {

}

type Data = {
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
        wind_mph: number;
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
    }
}


async function getWeatherInfo(): Promise<any> {
    const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
        params: {
            key: process.env.REACT_APP_API_KEY,
            q: 'London',
            days: 2
        }
    })
    console.log("RESPOSTA: ", response.data);
    return response.data;
}


export default function ForecastWeather() {

    const [weatherInfo, setWeatherInfo] = useState<Data>();

    useEffect(() => {
        (async () => {
            const weatherInfo = await getWeatherInfo();
            setWeatherInfo(weatherInfo);
        })();
    }, []);

    console.log("DEPOIS DE USAR NO USE-STATE", weatherInfo )

    return(
        <>
            <span className='middleOfScreen'>+</span>
            <Card className='weatherCard'>
                <CardContent className='weatherCardCont'>
                    
                    <Typography sx={{ fontSize: 24 }} >
                        {weatherInfo?.location.name}
                    </Typography>

                    <Typography variant="body2">
                        <img src={weatherInfo?.current.condition.icon} width={150} height={150}/>
                    </Typography>

                    <Typography sx={{ fontSize: 24 }} >
                        {weatherInfo?.current.temp_c}ºC
                    </Typography>

                    <Typography sx={{ fontSize: 24 }}>
                        {weatherInfo?.current.condition.text}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>


            {/* <ul>
                {forecastinfo?.forecast?.forecastday?.map((data: Forecastday) => (
                    <li> {data.date} </li>
                ))}
                <li> {forecastinfo?.location.name} </li>
            </ul> */}
        
        </>

    );


}
