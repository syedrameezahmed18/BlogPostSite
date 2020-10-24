
import React,{useContext,Fragment,useState,useEffect} from 'react';
import {Usercontext,Tokencontext} from '../context'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Guidelines from './guidelines';
import Cardcomp from './card';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
  


export default function Posts() {

    
    let [posts,setposts] = useState([]);
    let [search,setsearch] = useState("");
    let [isloading,setisloading] = useState(true);

    let {username,setusername} = useContext(Usercontext)
    let {token,settoken} = useContext(Tokencontext);

  /*useEffect(()=>{
    let url=`http://localhost:3030/api/posts`
    console.log(`check`);
    fetch(url,{
        headers:{
            "Content-Type":"application/json"
        },
        method: "POST"
    })
        .then(resp=>resp.json())
            .then(content => {
                console.log(content);
            })
  },[]) */ 

  useEffect(()=>{
      fetch(`http://localhost:3030/api/posts`)
        .then(resp=>resp.json())
            .then(content => {
                console.log(content);
                setposts(content);
                setisloading(false);
            })
  },[])


  const filtertext = (e) => {
      setsearch(e.target.value)
     
  }

  const filtered = posts.filter((post)=>{
    return post.title.toLowerCase().includes(search.toLowerCase())
})

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

 console.log(`hey ${username} ${token}`);
  return (
      <Fragment>
    
    <div className="popup">
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Guidelines
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Guidelines />
      </Backdrop>
    </div>

    <div className="mainposts">
        <div className="configs">
            <div className="we">
            <p className="how">All Posts</p>
            <Fragment>
            {
                (username === '' || token === '' ||username===null ||token===null) ? (
                <Link to="/login"><button className="addition btn btn-success">Add</button></Link>
            ):(
                <Link to="/add"><button className="addition btn btn-success">Add</button></Link>
            )}
             </Fragment>
            
            </div>
            <div className="innest">
            <p>Filter</p>   
            <input type="text" onChange={filtertext} className="form-control"/>
            </div>
        </div>
        
        <Fragment>
            {
            isloading ?
            (<div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div> )

        :(<div className="fetchedposts">
            {
                filtered.map((post,id)=>{
                    return(
                        <Cardcomp 
                            name={post.email}
                            data={post.bodydata}
                            title={post.title}
                            time={post.time}
                            compoid={id}
                        />
                    )
                })
            }
        </div>)
            }
        </Fragment>
            
            
    </div>

    </Fragment>
  );
}




