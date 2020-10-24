import React,{useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Usercontext,Tokencontext} from '../context'
import {Link} from 'react-router-dom';

const Addpost = () => {

    const history = useHistory();
    let {username,setusername} = useContext(Usercontext)
    let {token,settoken} = useContext(Tokencontext);
    let [title,settitle] = useState('');
    let [body,setbody] = useState('');

    const ontitlechange = (e) => {
        settitle(e.target.value);
    }
    const onbodychange = (e) => {
        setbody(e.target.value);
    }

    const send = (e) => {
        e.preventDefault()
        if(title === '' || body ==='') {
            alert("incomplete post!")
            return;
        }
        else {
            let data={
                uemail:username,
                title:title,
                bodydata:body
            }
            let url=`http://localhost:3030/api/posts`;
            fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }).then(resp => resp.json())
                .then(outcome => {
                    if(outcome.error) {
                        console.log(outcome.error)
                    }
                    if(outcome.data) {
                        alert("Post added")
                        history.push("/posts");
                    }
                })

        }
    }

    return(
        <div className="lk">
            <h2>Create Post</h2>
            <div className="cov">
            <form className="controls form-action" method="POST">
                <div className="form-group">
                    <Link to="/"><label>Change?</label></Link>
                    <input class="ok" placeholder={`Current User : ${username}`} className="form-control" type="text" disabled={true}/>
                </div>
                <div className="form-group">
                    <label>Add a title</label>
                    <input onChange={ontitlechange} class="ok" placeholder="e.g Heading" className="form-control" type="text" />
                </div>
                <div className="form-group"> 
                    <label>Add Description</label>
                    <textarea onChange={onbodychange} row="20" column="300" placeholder="e.g Describe the post" className="form-control" type="text" />
                </div>       
                    <button onClick={send} className="btn btn-outline-warning">POST</button>
                
            </form>
            </div>
        </div>)
}

export default Addpost