import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

const SearchFilter = (props) => {

  return(
    <div>
      <h2> {props.title} </h2>
      <form>
        <input
          value = {props.newSearch}
          onChange = {props.handleSearchChange}
          />
      </form>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  return(
    <div>
      <SearchFilter title = 'Search Countries' newSearch = {newSearch} handleSearchChange = {handleSearchChange}/>
      <CountryDisplay countries = {countries} search = {newSearch}/>
    </div>
  )
}
export default App;
