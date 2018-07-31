import React from 'react';
import {NavLink} from 'react-router-dom'

const PostLink = (props) => (
  <span className="font-lg">
    <a>
      <NavLink to={"/post/" + props.value['post_id']}>
        {props.value['post_title']}
      </NavLink>
    </a><br/>
  </span>
)

export default PostLink;
