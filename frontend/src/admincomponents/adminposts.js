import React,{useEffect,useState} from 'react';

const Adminusers = () => {

    let [postarr,setpostarr] = useState([])

    useEffect(()=>{
        let url = `http://localhost:3030/api/allposts`
        fetch(url,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        })
           .then(resp=>resp.json())
               .then(data=>{
                   console.log(data);
                   setpostarr(data);
               })
     },[]) 

    return(<div className="admincover">
              <div className="usertable">
            <h2>All Posts</h2>    
            <table class="table">
                <thead>
                    <tr>
                        <th>PostID</th>
                        <th>Title</th>
                        <th>Time</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                            postarr.map((user)=>{
                                return(<tr>
                                        <td>{user.postid}</td>
                                        <td>{user.title}</td>
                                        <td>{user.time}</td>
                                       </tr>)
                            })
                        }
                    </tbody>
                    </table>
                
            </div>
            </div>)
}

export default Adminusers;