import React, { Component } from 'react';
import "./Sidebar.css";
import PropTypes from 'prop-types';
import API from "../../../api";
import {NavLink} from "react-router-dom";

const defaultProps = {};

const propTypes=
  {
    children: PropTypes.node
  };

class Sidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      name: []
    };

    this.renderClique = this.renderClique.bind( this );
  }

  componentWillMount(){
    API.get( '/subscribed_clique_relation/getsubscribedclique/' + localStorage.getItem('username') )
      .then( response => {
        if(response.data.length > 0){
          let data = [];
          response.data.map( ( content, index ) => data[ index ] = content );
          this.setState( { items: data } );
        }
      } );
  }

  render(){
    return(
      <ul className="mdc-list sidebar-scroll">
          <NavLink to={"/feeds"}>
            <li className={"mdc-list-item sidebar-containerALL sidebar-text "}>
              All
            </li>
          </NavLink>
        { this.renderClique() }
      </ul>
    );
  }

  renderClique(){
    let data = [];
    this.state.items.forEach((item, idx)=> {
        data.push(
          <NavLink to={"/clique/"+item['title']}>
            <li key={idx} className="mdc-list-item sidebar-container sidebar-text glyphicon glyphicon-star"
                onClick={ () => {
                  localStorage.setItem( "visiting_clique", item[ 'title' ] );
                } }
            >
              { item[ 'title' ] }
              </li>
          </NavLink>
        )
    });
    return data;
  }

}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
