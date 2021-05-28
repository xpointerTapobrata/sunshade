import './App.css';
import { useState, useEffect } from 'react';
import Pointsofinterest from './Pointsofinterest.jsx';

function App() {
const [city, setcity] = useState('')
const [updated, setupdated] = useState('london')
const [weatherdata, setweatherdata] = useState([])
const [poi, setpoi] = useState([])

const[expand, setexpand] = useState(false)

const ac = new AbortController();
const signal = ac.signal;

const api = '2e33d4213761841b4f06a23688654348'

const fetchweather = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${updated}&units=metric&appid=${api}`, { signal : signal })
    const data =  await res.json();
    setweatherdata(data)
    console.log(weatherdata)
}

const fetchpoi = async () => {
  const res = await fetch(`https://api.tomtom.com/search/2/poiSearch/${updated}.json?key=UIH0m6wdiwIkZzx5DWqxzvA0XGzq0G5y`, { signal : signal })
  const data = await res.json();
  setpoi(data)
  
}

console.log(poi)

const getcity = (e) => {
  setcity(e.target.value)
  console.log(city)
}

const getupdate = () => {
  setupdated(city)
}

const toggleExpand = () => {
  setexpand(!expand)
  console.log(expand)
}

const collapse = () => {
  expand &&
  setexpand(false)
}

useEffect(() => {
  fetchweather()
  fetchpoi()
  return () => {
    ac.abort()
  }
}, [updated])

  return (
    <div className="App">
      
         <div className="weatherapp">
            <div className="searchbar">
              <h4>SunShade</h4>
              <input type='text' placeholder= 'Search a city' onChange = {getcity}/>
              <i class="fas fa-search" onClick = {getupdate}></i>
            </div>
            {
              !weatherdata.main ? 'No data found' :
              <>
              <div className = 'weats' onClick = {collapse}>
                <h1>{weatherdata.name}</h1>
                <div className= 'weather'>
                    {
                       weatherdata.weather.map(i => (
                        <div className = 'symbol'><img src = {`http://openweathermap.org/img/wn/${i.icon}@2x.png`} /></div>
                       ))
                    }
                   
                    <div className = 'details'>
                        <h3 className = 'temperature'>{weatherdata.main.temp}&nbsp; <span>&#8451;</span></h3>
                        {
                          weatherdata.weather.map(i => (
                            <h5 className = 'main'>{i.description}</h5>
                          ))
                        }
                       
                    </div>
                </div>
              </div>
            <div className = 'minmaxdetails'>
              <div className = 'minmax'>
                <div className= 'mintemp'>
                    <h3>{weatherdata.main.temp_min}<span>&#8451;</span></h3>
                    <p style = {{ color : 'aliceblue'}}>MIN</p>
                </div>
                <div className= 'maxtemp'>
                    <h3>{weatherdata.main.temp_max}<span>&#8451;</span></h3>
                    <p style = {{ color : 'aliceblue'}}>MAX</p>
                </div>
              </div>
            </div>
            <div className = 'other'>
                <div className = 'feels'>
                  <h4><i class="fas fa-temperature-high fa-2x"></i></h4>
                  <h3>{weatherdata.main.feels_like} <span>&#8451;</span></h3>
                </div>
                <div className = 'humidity'>
                  <h4><span className="iconify" data-icon="wi-humidity" data-inline="false"></span></h4>
                  <h3>{weatherdata.main.humidity} %</h3>
                </div>
                <div className = 'pressure'>
                  <h4><span class="iconify" data-icon="wi-barometer" data-inline="false"></span></h4>
                  <h3>{weatherdata.main.pressure} hPa</h3>
                </div>
                <div className = 'wind'>
                  <h4><i class="fas fa-wind"></i></h4>
                  <h3>{weatherdata.wind.speed} kph</h3>
                </div>
            </div>
            <h4 className = 'credit'>Powered by OpenWeather</h4>
            </>
            }
          <div className = {expand ? 'extras expandextra' : 'extras'}>
            <Pointsofinterest expand = {toggleExpand} poi = {poi}/>
          </div>
        </div>

    </div>
  );
}

export default App;
