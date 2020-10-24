import React,{useContext,useState,useEffect} from 'react';
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import {Link,Route,Switch} from 'react-router-dom'
import Home from './components/home';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Posts from './components/posts';
import {Usercontext,Tokencontext} from './context'
import Addpost from './components/addpost';

function App() {
    
  let [username,setusername] = useState('');
  let [token,settoken] = useState('');

  useEffect(()=>{
    let loggeduser = localStorage.getItem('loggeduser');
    let usertoken = localStorage.getItem('usertoken');
    settoken(usertoken)
    setusername(loggeduser)
},{})
  return (
    <div>
       <Usercontext.Provider value={{username,setusername}} >
          <Tokencontext.Provider value={{token,settoken}} >
          <Header />
          <Switch>
       
            <Route path="/" exact component={Home}/>
            <Route path="/posts" exact component={Posts}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/add" exact component={Addpost} />
        
          </Switch>
        </Tokencontext.Provider>
      </Usercontext.Provider>
     
    </div>  
  );
}

export default App;
