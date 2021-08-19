import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './Filter.js';
import Results from './Results.js';
import Print from './Print.js';

function App() {

  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  let index=0;

  const handleSearch = (event) => {
    setShow(false);
    setSearch(event.target.value);
    axios
      .get('https://restcountries.eu/rest/v2/name/'+event.target.value)
      .then(response => {
        console.log(response.data);
        if(response.data.length > 10 || response.data===undefined) {
          setCountries([]);
        } else {
          setCountries(response.data);
        }
      });
  }

  const findProperty = (name) => {
    return new Promise( resolve => {
      axios
        .get("http://api.weatherstack.com/current?access_key=a38c7bab00f816fc41f3e4c20d3bb4f0&query=" + name)
        .then(response => {
            console.log(response.data);
            resolve(response);
        })
    });
}

  async function onClick(event) {
    let response = await findProperty(event.target.id);
    setWeather(response.data);
    event.preventDefault();
    index = countries.findIndex((el) => el.name === event.target.id);
    console.log(index);
    setShow(true);
  }

  console.log('yo');
  console.log(index);
  console.log(countries[index]);
  return (
    <div>
      <Filter search={search} handleSearch={handleSearch}/>
      {show?<Print country={countries[index]} weather={weather} />:<Results countries={countries} onClick={onClick} />}
    </div>
  );
}

export default App;
