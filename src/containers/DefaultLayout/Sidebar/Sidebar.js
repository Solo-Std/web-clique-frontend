import React, { Component } from 'react';
import axios from "axios/index";
import "./Sidebar.css";

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
        console.log(this.state.items[0]['clique_id']);
      } );
  }

  render(){
    return(
      <ul className="mdc-list sidebar-scroll">
        { this.renderClique() }
      </ul>
    );
  }

  renderClique(){
    let data = [];
    for(let i = 0; i < this.state.items.length; i++){
      data.push(
        <li className="mdc-list-item sidebar-container sidebar-text">{this.state.items[i]['title']}</li>
      );
    }

    return data;
  }

}

export default Sidebar;
