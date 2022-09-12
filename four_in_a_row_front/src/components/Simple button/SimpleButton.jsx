import React from 'react';
import classes from "./SimpleButton.module.css";
const SimpleButton = (props) => {
    return (
        <button className={classes.SimpleButton + (props.active ? ' ' + classes.selected : '') + (props.align_right ? ' ' + classes.right : '')} style={props.style}>
            {props.children}
        </button>
    );
};

export default SimpleButton;