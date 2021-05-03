import React from 'react'

const SearchFilter = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <form>
        <div>
          <input
            value = {props.newSearch}
            onChange = {props.handleSearchChange}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchFilter
