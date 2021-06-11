import React from 'react'

const CountrySpecifics = ({country}) => {

  return(
    <div>
      <h1>{country.name}</h1>
      <br/>
      <p> Capital: {country.Capital} </p>
      <p> Population: {country.population} </p>
      <br/>
      <h2> Languages: </h2>
      <ul>
        {country.languages.map((language) => {
          return(
            <li key = {language.name}>{language.name}</li>
          )
        })}
      </ul>
      <br/>
      <img src = {country.flag} alt = 'flag'/>
    </div>
  )

}

export default CountrySpecifics
