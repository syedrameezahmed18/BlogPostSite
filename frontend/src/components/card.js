import React,{Fragment,useState} from 'react';

const Cardcomp = (props) => {

    let [comms,setcomms] = useState([])
    let [isshown,setisshown] = useState(false)
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
            </div>
         </Fragment>
        )
}

export default Cardcomp;