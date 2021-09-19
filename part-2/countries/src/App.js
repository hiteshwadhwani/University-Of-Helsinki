import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchFilter = ({ search, handleSearch }) => {
  return (
    <div>
      Search: <input value={search} onChange={handleSearch} />
    </div>
  );
};

const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>

      <div>Population : {country.population} </div>
      <div>capital : {country.capital}</div>
      <h3>Languages</h3>
      {country.languages.map((language , i) => (
        <div key={i}>{language.name}</div>
      ))}
      <br></br>
      <img src={country.flag} alt="Flag"></img>
      
    </>
  );
};
const Country = ({country}) => {
  const [show , setShow] = useState(false);
  if(show) {
    return (
      <>
      <CountryInfo country={country}/>
      <div><button onClick={() => setShow(false)}>{show === false ? 'show' : 'hide'}</button></div>
      

      </>
    )
  }
  return (
    <>
    <h5>{country.name}</h5>
    <button onClick={() => setShow(true)}>{show === false ? 'show' : 'hide'}</button>
     
    </>
  )
}
const ShowCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>specify another filter </div>;
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  return (
    <>
     {countries.map((country) => (
        <Country country={country} />
        
      ))}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const countriesToShow =
    search === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      // console.log(response.data);
      setCountries(response.data);
    });
  }, []);
  return (
    <>
      <SearchFilter search={search} handleSearch={handleSearch} />
      <ShowCountries countries={countriesToShow} />
    </>
  );
}

export default App;
