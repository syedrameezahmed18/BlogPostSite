import React,{useContext,useEffect,Fragment} from 'react';
import {Usercontext,Tokencontext} from '../context'
import {Link,useHistory} from 'react-router-dom'

const Home = () => {

    let {username,setusername} = useContext(Usercontext);
    let {token,settoken} = useContext(Tokencontext);
    const history = useHistory()
    console.log(username);
    
    return(<Fragment>
                {
                    (username === ''||username === null) ? (
                        <div className="wholog">
                        <p>Welcome Guest</p>
                        <Link to="/login"><p>Login?</p></Link>
                        </div>

                    ):(
                        <div className="wholog">
                            <p>{`Welcome User ${username}`}</p>
                            
                        </div>
                    )
                }
          </Fragment>)
}

export default Home;