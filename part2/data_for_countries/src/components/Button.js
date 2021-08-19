import React from 'react';

const Button = (props) => {

    return (
        <button id={props.name} onClick={props.onClick}>show</button>
    );
}

export default Button;