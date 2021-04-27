import React, { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Average = (props) => {
  return(
    (props.good - props.bad)/props.total
  )
}

const PercentPositive = (props) => {
  return(
    (props.good/props.total) * 100
  )
}

const Statistics = (props) => {
  return(
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral
  console.log(total)

  if (total === 0){
    return (
      <div>
        <h1> Give Feedback </h1>

        <Button handleClick = {() => setGood(good + 1)} text = {'good'}/>
        <Button handleClick = {() => setNeutral(neutral + 1)} text = {'neutral'}/>
        <Button handleClick = {() => setBad(bad + 1)} text = {'bad'}/>


        <h1> Statistics </h1>
        <p> No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick = {() => setGood(good + 1)} text = {'good'}/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = {'neutral'}/>
      <Button handleClick = {() => setBad(bad + 1)} text = {'bad'}/>


      <h1> Statistics </h1>
      <table>
        <tbody>
          <Statistics text = {'Good'} value = {good}/>
          <Statistics text = {'Neutral'} value = {neutral}/>
          <Statistics text = {'Bad'} value = {bad}/>
          <Statistics text = {'Average'} value = <Average good = {good} bad = {bad} total = {total}/>/>
          <Statistics text = {'Percentage'} value = <PercentPositive good = {good} total = {total}/>/>
        </tbody>
      </table>
    </div>
  )
}


export default App
