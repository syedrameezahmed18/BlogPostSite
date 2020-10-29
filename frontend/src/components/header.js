import React,{useContext,Fragment,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../App.css'
import {Usercontext,Tokencontext,Adminsessioncontext} from '../context';
import {BsPersonFill} from 'react-icons/bs';
import {AiOutlineArrowLeft} from 'react-icons/ai'

const Header = () => {

let {username,setusername} = useContext(Usercontext);
let {token,settoken} = useContext(Tokencontext);
let {admin,setadmin} = useContext(Adminsessioncontext);

let [isuser,setisuser] = useState(false)

    


 {/*User header functions*/}
const history = useHistory();

   const logouts = () => {

    if(username != '' || username != null) {
        localStorage.removeItem("loggeduser");
        localStorage.removeItem("usertoken");
        localStorage.removeItem("adminsession");
        setadmin('');
        settoken('');
        setusername('');
        history.push('/');
        
    }
   }
   {/*Admin header functions */}

   const adminlogout = () => {
    if(username != '' || username != null) {
        localStorage.removeItem("loggeduser");
        localStorage.removeItem("usertoken");
        localStorage.removeItem("adminsession");
        settoken('');
        setusername('');
        setadmin('');
        history.push('/');
        
    }
   }

   let [isopen,setisopen] = useState(false)

    const popup = () => {
        setisopen(true)
    }

    const declose = () => {
        setisopen(false)
    }
    console.log(`${admin} ok`)
    return(
        <Fragment>
         {   (admin === null || admin===undefined || admin==="") ? (
             
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
        </div>):(

  
        <div className="adminheader"> 
        {/*Admin header from above */}
            <div className="admintitle">
                <button onClick={popup} className="btn btn-success">Menu</button>
                <div className={`seperate ${isopen? 'smoothopen':'smoothclose'}`}>
                    <div className="limit">
                        <AiOutlineArrowLeft className="arrow" onClick={declose}/>
                        <Link to="/admin"><p>Home</p></Link>
                        <Link to="/adminusers"><p>Users</p></Link>
                        <Link to="/adminposts"><p>Posts</p></Link>
                        <Link to="/admincomments"><p>Comments</p></Link>
                        <Link to="/adminregister"><p>Add Admin</p></Link>
                    </div>
                </div>
                
                <p>BlogSite</p>
            </div>
            <div className="adminrest">
                <BsPersonFill className="adjusted"/>
                <p onClick={adminlogout} className="adminname" >{username}</p>
            </div>
        </div>)
        }
        </Fragment>
    )
}

export default Header;