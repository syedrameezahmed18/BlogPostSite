import React,{useRef,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const Register = () => {

    const history = useHistory();
    let [email,setemail] = useState('');
    let [uname,setuname] = useState('');
    let [pass,setpass] = useState('');

    const onnamechange = (e) => {
        setuname(e.target.value);
    }
    const onemailchange = (e) => {
        setemail(e.target.value);
    }
    const onpasschange = (e) => {
        setpass(e.target.value);
    }
    const registration = (e) => {

        e.preventDefault();
        

        console.log(`${uname} ${email} ${pass}`)
        if(uname === '' || email === '' || pass === '') {
            alert("pls fill all the fields")
            return;
        }
        else {
            let url = `http://localhost:3030/api/register`;
            let user = {name:uname,pass:pass,email:email}

            console.log(user);
            fetch(url,{
                headers:{
                    "Content-Type":"application/json"
                },
                method:'POST',
                body:JSON.stringify(user)
            })
                .then(resp => resp.json())
                    .then(content => {
                        if(content.error) {
                            alert(content.error.message);
                            
                        }
                        if(content.data) {
                            alert("Successfully registered User")
                            history.push("/");
                            
                        }
                    })
        }


    }


    return(<div>
        <div class="registerform" >
            <h2>Register User</h2>
        <form action="#" method='post' id="formreg">
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input onChange={onnamechange} name="uname" type="text" class="uname form-control" id="exampleInputUser1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={onemailchange}
                name="email" type="email" class="uemail form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={onpasschange}
                name="pass" type="password" class="upass form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" onClick={registration} class="btn btn-primary">Submit</button>
        </form>
            </div>
    </div>)
}

export default Register;