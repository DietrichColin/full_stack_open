import React from 'react';

const Notification = (props) => {

    const style = {
        color: props.succed?'green':'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }

    if(props.message === null) {
        return null;
    } else {
        return (
            <div style={style}>
                {props.message}
            </div>
        );
    }
}

export default Notification;