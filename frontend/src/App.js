import React,{useContext,useState,useEffect} from 'react';
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import {Link,Route,Switch} from 'react-router-dom'
import Home from './components/home';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Posts from './components/posts';
import {Usercontext,Tokencontext,Adminsessioncontext} from './context'
import Addpost from './components/addpost';

import Adminmain from './admincomponents/adminmain';
import Adminhome from './admincomponents/adminhome';
import Adminusers from './admincomponents/adminusers';
import Adminposts from './admincomponents/adminposts';


function App() {
    
  let [username,setusername] = useState('');
  let [token,settoken] = useState('');
  let [admin,setadmin] = useState('');

  useEffect(()=>{
    let loggeduser = localStorage.getItem('loggeduser');
    let usertoken = localStorage.getItem('usertoken');
    let adminsession = localStorage.getItem('adminsession')
    settoken(usertoken)
    setusername(loggeduser)
    setadmin(adminsession);
},{})
  return (
    <div>
       <Usercontext.Provider value={{username,setusername}} >
          <Tokencontext.Provider value={{token,settoken}} >
              <Adminsessioncontext.Provider value={{admin,setadmin}} >
                <Header />
                <Switch>
                  
                  <Route path="/" exact component={Home}/>
                  <Route path="/posts" exact component={Posts}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/add" exact component={Addpost} />

                  {/*admin routes*/}
              
                  <Route path="/admin" exact component={Adminhome} />
                  <Route path="/adminusers" exact component={Adminusers} /> 
                  <Route path="/adminposts" exact component={Adminposts} /> 
                </Switch>
          </Adminsessioncontext.Provider>
        </Tokencontext.Provider>
      </Usercontext.Provider>
     
    </div>  
  );
}

export default App;
