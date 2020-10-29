import React,{useState} from 'react';
import {BsPersonFill} from 'react-icons/bs';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {Link} from 'react-router-dom';

const Adminheader = () => {

    let [isopen,setisopen] = useState(false)

    const popup = () => {
        setisopen(true)
    }

    const declose = () => {
        setisopen(false)
    }

    return(
        <div className="adminheader"> 
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
                <p className="adminname" >sam</p>
            </div>
        </div>)
}

export default Adminheader;