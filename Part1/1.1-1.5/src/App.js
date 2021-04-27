
import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header Course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return(
  <h1>{props.Course}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part_number = {0} parts = {props.parts}/>
      <Part part_number = {1} parts = {props.parts}/>
      <Part part_number = {2} parts = {props.parts}/>
    </div>
  )
}
const Part = (props) => {
  return(
    <p>{props.parts[props.part_number].name} {props.parts[props.part_number].exercises}</p>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}
export default App
