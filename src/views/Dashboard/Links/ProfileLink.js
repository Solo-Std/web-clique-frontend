import React from 'react';
import TimeAgo from 'react-timeago';
import {NavLink} from 'react-router-dom'

const ProfileLink = (props) => (
  <span className="font-xs">Posted by&nbsp;
    <a className="text-info" onClick={() => {
      localStorage.setItem("visiting_profile", props.value['username']);
    }}>
      <NavLink to={"/user/" + props.value['username']}>
        @{props.value['username']}
      </NavLink>
    </a>
    &nbsp;
    <span className="font-xs">
        <TimeAgo date={props.value['date_created']}/>
      </span>
  </span>
)

export default ProfileLink;
