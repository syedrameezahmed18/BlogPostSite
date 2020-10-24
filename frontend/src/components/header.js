import React,{useContext,Fragment} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../App.css'
import {Usercontext,Tokencontext} from '../context';

const Header = () => {

let {username,setusername} = useContext(Usercontext);
let {token,settoken} = useContext(Tokencontext);

const history = useHistory();

   const logouts = () => {

    if(username != '' || username != null) {
        localStorage.removeItem("loggeduser");
        localStorage.removeItem("usertoken");
        settoken('');
        setusername('');
        history.push('/');
        
    }
   }

    return(
        <div className="header">
            <div className="lefts">
                <Link to="/"><p className="heading">BlogSite</p></Link>
                <Link to="/posts"><p className="thepostshead">Posts</p></Link>
            </div>
            <div className="rights">
                {   (username === '' || username=== null) ? (
                    <Fragment>    
                    <Link to ="/login">Login</Link>
                    <Link to ="/register">Register</Link>
                    
                    </Fragment>
                ):(
                    <Fragment>
                        <p>{`logged in as ${username}`}</p>
                        <p className="loged" onClick={logouts}>Logout</p>
                    </Fragment>
                )
                
                }

            </div>
        </div>
    )
}

export default Header;