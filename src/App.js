
import { useEffect, useState } from 'react';
import './App.css';
import High from './components/High';
import Temp from './components/Temp';

function App() {
  
  const [city,setCity]= useState("New Delhi")
  const [weatherData , setWeatherData] = useState(null);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=2db6513c306746378e0105220242111&q=${city}&aqi=no`;

  useEffect(()=>{
    fetch(apiURL)
  .then((response)=>{
    if(!response.ok){
      throw new Error("error");
    }
    return response.json();
  })
  .then((data)=>{
    console.log(data);
    setWeatherData(data);
  })
  .catch((e)=>{
    console.log(e);
  });

  },[city])

  

  return (
   <div className='bg-[#1F213A] h-screen flex justify-center align-top'>
    <div className='mt-40 mr-8 w-1/4 h-1/3'>
    {weatherData&&(  <Temp  setCity={setCity}
            stats={{
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition.text,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}/>)}
    </div>

    <div className=' mt-40 w-1/3 h-1/3 grid grid-cols-2 gap-6'>
      <h2 className='text-white text-2xl col-span-2'>Today's Highlights</h2>
      {weatherData && (
          <>
            <High
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_mph,
                unit: "mph",
                direction: weatherData.current.wind_dir,
              }}
            />
            <High
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <High
              stats={{
                title: "Visibility",
                value: weatherData.current.vis_miles,
                unit: "miles",
              }}
            />
            <High
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure_mb,
                unit: "mb",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
