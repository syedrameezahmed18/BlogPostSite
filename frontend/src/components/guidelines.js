import React from 'react';
import {Fade} from 'react-reveal';

const Guidelines = () => {
    return(
        <Fade left><div class="popup">
            <div className="guidehead">
                <p>Guidelines</p>
            </div>
            <div className="authorities">
                <div className="autobox">
                <h4>Admin</h4>
                <p>Can Create,Edit,Delete Posts and its comments</p>
                </div>
                <div className="autobox">
                <h4>User</h4>
                <p>Can Create posts and comment</p>
                </div>
                <div className="autobox">
                <h4>Guest</h4>
                <p>Can Only view posts and comments</p>
                </div>
            </div>
            <p>Happy Posting!</p>
        </div></Fade>)
}

export default Guidelines;