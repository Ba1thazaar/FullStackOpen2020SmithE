import React, {useState} from 'react'
import CountrySpecifics from './CountrySpecifics'


const CountryDisplay = (props) => {

  const [targetCountry, setTargetCountry] = useState()


  var validCountries =
      props.countries.filter((country) => {
      return country.name.toLowerCase().includes(props.search.toLowerCase())
    })

  const handleShowCountry = (country) => {
    console.log(country)
    setTargetCountry(country)
  }


  if(validCountries.length > 10){
    return(
      <div>
        <h3> Too many valid countries </h3>
      </div>
    )
  }
  if(validCountries.length === 1){
    return(
      <CountrySpecifics country = {validCountries[0]}/>
    )
  }

  if(targetCountry){
    return(
    <div>
      <CountrySpecifics country = {targetCountry}/>
    </div>
  )
  }
  return(
      <div>
        <ul>
          {validCountries.map((country) => {
            return(
              <li key = {country.name}>
              {country.name}
              <button onClick = {() => handleShowCountry(country)}>
                Show
              </button>
              </li>
            )
          })}
        </ul>
      </div>
  )
}

export default CountryDisplay
