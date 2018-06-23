import React, { Component } from 'react';
import axios from "axios/index";

class Sidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      name: []
    };
  }

  componentWillMount(){
    axios.get( `http://project-clique.herokuapp.com/index.php/api/subscribed_clique_master/getclique/` + localStorage.getItem('') )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  render(){
    return(
      <ul className="mdc-list sidebar-scroll">
        <li className="mdc-list-item sidebar-container sidebar-text">First item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">1234567890123456</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Single-line item</li>
        <li className="mdc-list-item sidebar-container sidebar-text">Last item</li>

        { this.renderClique() }
      </ul>
    );
  }

  sayHi(){
    console.log("Hi");
  }

  renderClique(){

  }

}

export default Sidebar;
