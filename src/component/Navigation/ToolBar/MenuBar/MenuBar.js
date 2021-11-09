import React from 'react';

import cssclass from './MenuBar.module.css';

const MenuBar = (props) => (
    <div className={cssclass.Drtool}>
    <div className={cssclass.DrawerToggle} onClick={props.clicked}>
    
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
);

export default MenuBar;