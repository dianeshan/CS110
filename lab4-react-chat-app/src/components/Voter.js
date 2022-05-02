//possible choices: neutral, down, up
//state machine:
//neutral: if(downVote){state=down; vote=-1;}else if(upVote){state=up; vote+=1;}
//down: if(downVote){state=neutral;vote+=1; }elseif(upVote){state=up;vote+=2;}
//up: if(downVote){state=down; vote-=2; }elseif(upVote){state=neutral;vote-=1;}
// ^ This is scratch work

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './Voter.css';


export default function Voter(){
    const [voteCount, setVoteCount] = useState(0);

    return (
        <div className="voting"> 
            <button className="upVote" onClick={() => setVoteCount(voteCount + 1)}> <FontAwesomeIcon icon={faAngleUp} /> </button>
            <div className="voteCount">{voteCount}</div>
            <button className="downVote" onClick={() => setVoteCount(voteCount - 1)}> <FontAwesomeIcon icon={faAngleDown} /> </button>
        </div>
    )
}
