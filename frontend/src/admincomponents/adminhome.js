import React,{useState,useEffect,useContext} from 'react';
import BsPersonFill from 'react-icons/bs';
import {Link,Switch,Route} from 'react-router-dom'
import {Usercontext,Tokencontext,Adminsessioncontext} from '../context'

const Adminhome = () => {

    let {username,setusername} = useContext(Usercontext)

    return(
        <div className="admincover">
            <p className="present">{`Welcome Admin ${username}`}</p>
            
        </div>)
}

export default Adminhome;