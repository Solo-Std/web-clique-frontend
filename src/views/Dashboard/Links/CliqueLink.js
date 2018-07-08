import React, { Component } from 'react';

class CliqueLink extends Component {
  render() {
    return (
      <a className="text-black-50 font-xs"
         onClick={ () => {
           this.props.onClick( this.props.value[ 'clique_name' ] );
           localStorage.setItem('visiting_clique',this.props.value['clique_name']);
         }
         }>
        <strong>#{ this.props.value[ 'clique_name' ] }</strong><br/>
      </a>
    );
  }
}

export default CliqueLink;
