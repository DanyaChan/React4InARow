import React from 'react';
import SimpleButton from "../Simple button/SimpleButton";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <div className={classes.MyHeader}>
            {
                props.page_list ?
                props.page_list.map((e) => {
                    return <SimpleButton active={props.current_page === e}> {e} </SimpleButton>
                }) : null
            }
            <SimpleButton name={'Login'} align_right={true}> </SimpleButton>
        </div>
    );
};

export default Header;