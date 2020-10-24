import React from 'react';

const Cardcomp = (props) => {
    return(
        
            <div class="holdup alert alert-success" role="alert">
                <div className="cardupper">
                <h5>{props.name}</h5>
                <p>{`${(props.time).substring(11,19)} @ ${(props.time).substring(0,10)}`}</p>
                </div>
                <h3>{props.title}</h3>
                <p>{props.data}</p>
                
            </div>
        )
}

export default Cardcomp;