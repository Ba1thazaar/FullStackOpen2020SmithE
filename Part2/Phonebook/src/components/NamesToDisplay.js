import React from 'react'
import DisplayContact from './DisplayContact'


const NamesToDisplay = (props) => {

  const validNames = props.persons.filter((person) => {
    return person.name.toLowerCase().includes(props.search.toLowerCase())
  })

  if (props.search === ('')){
    return(
      props.persons.map(person => {
        return <DisplayContact key = {person.name} person = {person} handleContactRemove = {props.handleContactRemove}/>
      })
    )
  }
  return(
    validNames.map(person => {
      return <DisplayContact key = {person.name} person = {person} handleContactRemove = {props.handleContactRemove}/>
    })
  )
}

export default NamesToDisplay
