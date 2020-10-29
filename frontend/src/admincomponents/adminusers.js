import React,{useState,useEffect} from 'react';

const Adminusers = () => {


    let [usersarr,setusersarr] = useState([])

 useEffect(()=>{
    let url = `http://localhost:3030/api/allusers`
    fetch(url,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"GET"
    })
       .then(resp=>resp.json())
           .then(data=>{
               console.log(data);
               setusersarr(data);
           })
 },[]) 
     
        

    return(<div className="admincover">
              <div className="usertable">
            <h2>All Users</h2>    
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                            usersarr.map((user)=>{
                                return(<tr>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                       </tr>)
                            })
                        }
                    </tbody>
                    </table>
                
            </div>
            </div>)
}

export default Adminusers;