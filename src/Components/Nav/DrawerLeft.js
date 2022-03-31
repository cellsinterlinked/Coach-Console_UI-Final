import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Drawer.css'

const DrawerLeft = props => {


  const content =

  <CSSTransition
    in={props.show}
    timeout={200}
    classNames="slide-in-left"
    mountOnEnter
    unmountOnExit
    >
    <aside className={props.name} onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>


    return ReactDOM.createPortal(content, document.getElementById('drawer-hook-left'));
};

export default DrawerLeft;