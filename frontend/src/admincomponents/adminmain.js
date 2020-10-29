import React from 'react';
import Adminheader from './adminheader';
import {Link,Route,Switch} from 'react-router-dom';
import Adminhome from './adminhome';
import Adminusers from './adminusers';
import Adminposts from './adminposts';


const Adminmain = () => {
    return(
        <div>
            <Adminheader />
            <Switch>
           
            </Switch>
        </div>)
}

export default Adminmain;