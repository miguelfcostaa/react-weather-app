import React, { useState, useEffect } from 'react';
import "../../src/countries.css"
import NavBar from './NavBar';
import Data from '../types/Data.type';
import axios from 'axios';

export default function ViewCities() {

    const [ portugalInfo, setPortugalInfo ] = useState<Data>();

    useEffect(() => {
        (async () => {
            const portugalInfo = await getPortugalInfo();
            setPortugalInfo(portugalInfo);
                  
        })();
    });


    async function getPortugalInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: "Portugal",
                days: 1
            }
        })
        return response.data;
    }


    const [ spainInfo, setSpainInfo ] = useState<Data>();

    useEffect(() => {
        (async () => {
            const spainInfo = await getSpainInfo();
            setSpainInfo(spainInfo);
                  
        })();
    });


    async function getSpainInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: "Spain",
                days: 1
            }
        })
        return response.data;
    }

    const [ franceInfo, setFranceInfo ] = useState<Data>();

    useEffect(() => {
        (async () => {
            const franceInfo = await getFranceInfo();
            setFranceInfo(franceInfo);
                  
        })();
    });


    async function getFranceInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: "France",
                days: 1
            }
        })
        return response.data;
    }


    return (
        <>
            <NavBar />
            <img className='europeMap'></img>
            <div>
                <img className='portugal'></img>
                <span className='ptInfo'>
                    <p>Country: {portugalInfo?.location.country} </p>
                    <p>Temperature: {portugalInfo?.current.temp_c}ºC</p>
                
                </span>
            </div>
            <div>
                <img className='spain'></img>
                <span className='spainInfo'>
                    <p>Country: {spainInfo?.location.country} </p>
                    <p>Temperature: {spainInfo?.current.temp_c}ºC</p>
                
                </span>
            </div>
            <div>
                <img className='france'></img>
                <span className='franceInfo'>
                    <p>Country: {franceInfo?.location.country} </p>
                    <p>Temperature: {franceInfo?.current.temp_c}ºC</p>
                
                </span>
            </div>
        </>
    );
}