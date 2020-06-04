import React from 'react';

const MyButton = props => {
    return(
        <div>
            <button className="btn btn-primary" onClick={props.action}>{props.title}</button>
        </div>
    )
}

export default MyButton;