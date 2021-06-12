import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country["name"]}</h1>
      capital {country["capital"]}<br/>
      population {country["population"]}
      <h2>languages</h2>
      <ul>
        {country["languages"].map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img alt="country's flag" src={country["flag"]} height='150px' width='200px' />
      <ShowWeather capital={country["capital"]} />
    </div>
  )
}

const CountryName = ({country, setFilteredCountries}) => {
  const handleShow = () => {
    setFilteredCountries([country])
  }

  return (
    <div>
      {country['name']} 
      <button onClick={handleShow}>show</button><br/>
    </div>
  )
}

const ShowFilteredCountries = ({filteredCountries, setFilteredCountries}) => {
  return (
    <div>
      {filteredCountries.length > 10 
        ? "Too many matches specify another filter"
        : filteredCountries.length === 1
        ? <CountryDetails country={filteredCountries[0]} />
        : filteredCountries.map(
            (country, i) => 
              <CountryName key={i} country={country} setFilteredCountries={setFilteredCountries} />
          )
      }
    </div>
  )
}

const ShowWeather = ({capital}) => {
  const [currentWeather, setCurrentWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then(response => {
        setCurrentWeather(response.data.current)
      })
  }, [api_key, capital])

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <b>temperature: {currentWeather["temperature"]} Celsius</b><br/>
      <img alt="weather_icon" src={currentWeather["weather_icons"]}/><br/>
      <b>wind: {currentWeather["wind_speed"]}</b>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => setCountries(response.data))
  }, [])

  const handleCountries = (event) => {
    if (event.target.value === "")
    {
      setFilteredCountries([])
    }else {
      setFilteredCountries(countries.filter(
        country => country['name'].toLowerCase().includes((event.target.value).toLowerCase())
      ))
    }
  }

  return (
    <div>
      find countries <input onChange={handleCountries} /><br/>
      <ShowFilteredCountries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App;
