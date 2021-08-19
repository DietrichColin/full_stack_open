import React from 'react';
import Button from './Button.js';

const Results = (props) => {

    console.log(props.countries.length<=10);
    if(props.countries.length <= 10 && props.countries.length!=0) {
        console.log('yess');
        return (
            props.countries.map(value => {
                console.log(value.name);
                return (
                  <div key={value.name}>
                      {value.name}
                        <Button name={value.name} onClick={props.onClick}/>
                  </div>
                );
              })
        );
    } else {
        return (
            <div>Too many matches... Scecify another filter</div>
        );
    }
}

export default Results;