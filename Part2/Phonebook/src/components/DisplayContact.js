import React from 'react'

const DisplayContact = (props) => {

  return(
    <li>
    {props.person.name} : {props.person.number}
    <button onClick = {props.handleContactRemove(props.person)}>
      delete
    </button>
    </li>
  )
}

export default DisplayContact
