import React,{Fragment,useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Usercontext,Tokencontext} from '../context'

const Cardcomp = (props) => {

    let [comms,setcomms] = useState([])
    let [isshown,setisshown] = useState(false)
    let history = useHistory();

    let {username,setusername} = useContext(Usercontext);
    let {token,settoken} = useContext(Tokencontext);

    const showcomments = (trueid) => {
        let url=`http://localhost:3030/api/comments/${trueid}`;

        fetch(url,{
            headers:{
                "Content-Type":"application/json"
            },
            method:'GET'
        })
            .then(resp=>resp.json())
                .then(data => {
                    console.log(data);
                    setcomms(data);
                })

        setisshown(true);     

    }

    const addcomm = (trueid) => {

        if (username === null || username ==="" || token === null || token === "") {
            history.push("/login");
        }
        else{
        let comment = prompt();

        if (comment === '' || comment === null) {
            alert("Incomplete Comment");
            return;
        }
        let data = {
            comment:comment
        }
        let url=`http://localhost:3030/api/comments/${trueid}`;

        fetch(url,{
            method:"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp=>resp.json())
                .then(content => {
                    if(content.error) {
                        console.log(content.error.message);
                    }
                    if(content.data) {
                        alert("comment added");
                        console.log(content.data.truedata);
                        setcomms(content.data.truedata);
                    }
                })
            }
    }

    const hidecomms = (trueid) => {
        setcomms([]);
        setisshown(false);
    }

    return(
        <Fragment>
            <div class="holdup alert alert-success" role="alert">
                <div className="cardupper">
                <h5>{props.name}</h5>
                <p>{`${(props.time).substring(11,19)} @ ${(props.time).substring(0,10)}`}</p>
                </div>
                <h3>{props.title}</h3>
                <div className="lasts">
                <p>{props.data}</p>
                {   isshown ? (
                    <button onClick={()=>hidecomms(props.trueid)} className="btn btn-success">Hide Comments</button>
                ):
                (<button onClick={()=>showcomments(props.trueid)} className="btn btn-success">Comments</button>)
                }
                </div>
            </div>

            {/*Comments for that post*/}
            <div class="commcontainer">
                {   comms.map((comm)=>{
                    return(
                        <div class="comms alert alert-warning" role="alert">
                            <p>{comm.comment}</p>
                            <p>{`${(comm.commenttime).substring(11,19)} @ ${(comm.commenttime).substring(0,10)}`}</p>
                        </div>
                    )
                })
            
                }
                { isshown ? (
                <button onClick={()=>addcomm(props.trueid)} className="btn btn-outline-warning">Add Comment</button>):(null)
                }
            </div>
         </Fragment>
        )
}

export default Cardcomp;