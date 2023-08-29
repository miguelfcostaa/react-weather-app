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

    const [ englandInfo, setEnglandInfo ] = useState<Data>();

    useEffect(() => {
        (async () => {
            const englandInfo = await getEnglandInfo();
            setEnglandInfo(englandInfo);
                  
        })();
    });


    async function getEnglandInfo(): Promise<any> {
        const response = await axios.get<Data>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: process.env.REACT_APP_API_KEY,
                q: "England",
                days: 1
            }
        })
        return response.data;
    }


    return (
        <>
            <NavBar />
            <img alt='' className='europeMap'></img>
            <div>
                <img alt='' className='portugal'></img>
                <span className='ptInfo'>
                    <p>Country: {portugalInfo?.location.country} </p>
                    <p>Condition: {portugalInfo?.current.condition.text} </p>
                    Temperature: {portugalInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='spain'></img>
                <span className='spainInfo'>
                    <p>Country: {spainInfo?.location.country} </p>
                    <p>Condition: {spainInfo?.current.condition.text} </p>
                    Temperature: {spainInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='france'></img>
                <span className='franceInfo'>
                    <p>Country: {franceInfo?.location.country} </p>
                    <p>Condition: {franceInfo?.current.condition.text} </p>
                    Temperature: {franceInfo?.current.temp_c}ºC
                
                </span>
            </div>
            <div>
                <img alt='' className='england'></img>
                <span className='englandInfo'>
                    <p>Country: {englandInfo?.location.country} </p>
                    <p>Condition: {englandInfo?.current.condition.text} </p>
                    Temperature: {englandInfo?.current.temp_c}ºC
                
                </span>
            </div>
        </>
    );
}