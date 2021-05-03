
import NamesToDisplay from './components/NamesToDisplay'
import AddEntryForm from './components/AddEntryForm'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'
import './index.css'

import React, { useState, useEffect} from 'react'

const App = () => {

  const [persons, setPersons ] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const updateContactList = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then( response => {
        setPersons(response.data)
      })
  },[])

  const addName = (event) => {
    event.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber
    }

    const targetPerson = persons.find(p => p.name === personObj.name)

    if(targetPerson){
      window.confirm(personObj.name + ' already exists in phonebook, replace old number with the new one?')
      personService
        .update(targetPerson.id, personObj)
        .then(response => {
          setPersons(persons.map(person => person.id === targetPerson.id ? response.data : person))
          setNewName('')
          setNewNumber('')
          setNotifMessage(
            personObj.name + ' number changed to: ' + personObj.number
          )
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
    }
    else{
      personService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotifMessage(
            personObj.name + ' has been added to the phonebook'
          )
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })

    }
  }

  const Notification = ({message}) => {
    if (message === null){
      return null;
    }
    return (
      <div className = "notification">
        {message}
      </div>
    )
  }

  const ErrorMessage = ({message}) => {
    if (message === null){
      return null;
    }
    return (
      <div className = "error">
        {message}
      </div>
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleContactRemove = (person) => () => {
    window.confirm('Delete: ' + person.name + '?')
    console.log(person.id)
    personService
      .remove(person.id)
      .catch(error => {
        setErrorMessage(
          'Contact ' + person.name + ' was already removed from phonebook'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .then(
        updateContactList,
        setNotifMessage(
          person.name + ' has been deleted from the phonebook'
        )
      )
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message = {notifMessage}/>
      <ErrorMessage message = {errorMessage}/>
      <SearchFilter title = 'Filter By Name' handleSearchChange = {handleSearchChange} newSearch = {newSearch}/>
      <AddEntryForm title = 'Add Contact' addName = {addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        <ul>
         <NamesToDisplay search = {newSearch} persons = {persons} handleContactRemove = {handleContactRemove}/>
        </ul>
      </div>
    </div>
  )
}

export default App
