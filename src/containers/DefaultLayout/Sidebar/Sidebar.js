import React, { Component } from 'react';
import axios from "axios/index";
import './Sidebar.css';

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
    axios.get( 'https://project-clique.herokuapp.com/index.php/api/subscribed_clique_relation/getsubscribedclique/' + localStorage.getItem('user_id') )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  render(){
    return(
      <ul className="mdc-list sidebar-scroll">
        { this.sayHi() }
        { this.renderClique() }
      </ul>
    );
  }

  sayHi(){
    console.log("USER_ID: " + localStorage.getItem('user_id'));
    console.log("DATA: " + this.state.items.length);
  }

  renderClique(){
    let data = [];
    for(let i = 0; i < this.state.items.length; i++){
      data.push(
        <li className="mdc-list-item sidebar-container sidebar-text">Sidebar item</li>
      );
    }

    return data;
  }

}

export default Sidebar;
