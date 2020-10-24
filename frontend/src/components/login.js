import React,{useState,useContext} from 'react';
import {useHistory,Link} from 'react-router-dom';
import {Usercontext,Tokencontext} from '../context'

const Login = () => {

    const history = useHistory()

    let [emails,setemails] = useState('');
    let [pass,setpass] = useState('');

    let {username,setusername} = useContext(Usercontext)
    let {token,settoken} = useContext(Tokencontext)


    const onemailchange = (e) => {
        setemails(e.target.value);
    }
    const onpasschange = (e) => {
        setpass(e.target.value);
    }

    const submission = (e) => {
        e.preventDefault();
        let email = emails;
        let password = pass;
        console.log(`${email} ${pass} `)
        if(email === '' || password === '') {
            alert("Fill all the required fields");
            return;
        }
        else {
        let url = `http://localhost:3030/api/login`;
        let user = {email,pass}
        fetch(url,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(user)
        })
            .then(resp => resp.json())
                .then(content => {
                    if(content.error) {
                        console.log(content.error)
                    }
                    if(content.data) {
                        localStorage.removeItem('loggeduser');
                        localStorage.removeItem('usertoken');
                        localStorage.setItem('loggeduser',content.data.email);
                        localStorage.setItem('usertoken',content.data.token);
                        setusername(content.data.email);
                        settoken(content.data.token);
                        alert("Successfully LoggedIn User" + content.data.email)
                        console.log(content.data.token)
                        history.push("/")
                        
                    }
                })
        }


    }

    return(<div> 
            <div class="loginform">
          <h2>Login User</h2>
        <form method="POST" id="formlog">
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input onChange={onemailchange} type="email" class="uemail form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input onChange={onpasschange} type="password" class="upass form-control" id="exampleInputPassword1"/>
            </div>
            <button onClick={submission} type="submit" class="btn btn-primary">Submit</button>
          </form>
      </div>
        </div>)   
}

export default Login;