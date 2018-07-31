import React from 'react';
import {NavLink} from 'react-router-dom'

const CliqueLink = (props) => (
  <a className="text-black-50 font-xs"
     onClick={() => {
       localStorage.setItem('visiting_clique', props.value['clique_name']);
     }
     }>
    <NavLink to={"/clique/" + props.value['clique_name']}>
      <strong>#{props.value['clique_name']}</strong><br/>
    </NavLink>
  </a>
)

export default CliqueLink;
