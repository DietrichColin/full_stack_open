import React, {useState} from 'react';
import './index.css';

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  );
} 

const ButtonList = (props) => {
  return (
    <div>
      <Button onClick={props.button[0].onClick} name={props.button[0].name}/>
      <Button onClick={props.button[1].onClick} name={props.button[1].name}/>
      <Button onClick={props.button[2].onClick} name={props.button[2].name}/>
    </div>
  );
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <th>{props.number}</th>
      </tr>
  );
}

const Statistics = (props) => {
  if(props.info[0].number===0 && props.info[1].number===0 && props.info[2].number===0) {
    return (<p>No Feedback given</p>);
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text={props.info[0].name} number={props.info[0].number}/>
          <StatisticLine text={props.info[1].name} number={props.info[1].number}/>
          <StatisticLine text={props.info[2].name} number={props.info[2].number}/>
          <StatisticLine text={props.info[3].name} number={props.info[3].number}/>
          <StatisticLine text={props.info[4].name} number={props.info[4].number}/>
          <StatisticLine text={props.info[5].name} number={props.info[5].number+"%"}/>
        </tbody>
      </table>
    );
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (number) => {
    if(number===1) {
      return () => setGood(good+1);
    } else if (number===2) {
      return () => setNeutral(neutral+1);
    } else if (number===3) {
      return () => setBad(bad+1);
    }
  }

  const buttons = [
    {onClick:handleClick(1),
    name: "good",
    },
    {onClick:handleClick(2),
      name: "neutral",
    },
    {onClick:handleClick(3),
      name: "bad",
    }
  ];

  const average = () => (good+bad*(-1))/(good+bad+neutral);
  const positive = () => (good/(good+bad+neutral))*100;
  console.log(average());

  const infos = [
    {
      name: "good",
      number: good
    },
    {
      name: "neutral",
      number: neutral
    },
    {
      name: "bad",
      number: bad
    },
    {
      name: "all",
      number: good+bad+neutral
    },
    {
      name: "average",
      number: average()
    },
    {
      name: "positive",
      number: positive()
    },
  ];

  return (
    <div>
      <Header title={"Give Feedback"}/>
      <ButtonList button={buttons}/>
      <Header title={"Statistics"}/>
      <Statistics info={infos}/>
    </div>
  );
}

export default App;
