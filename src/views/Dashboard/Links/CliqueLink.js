import React, { Component } from 'react';
import Skeleton from 'react-skeleton-loader';

class CliqueLink extends Component {
  render() {
    if(this.props.loading)
    {
      console.log("Clique Link loading");
      return (
        <a >

          <Skeleton width="25%" height="10px"/>
          <br/>
        </a>
      );
    }

    else
    {
      return (
        <a className="text-black-50 font-xs"
           onClick={ () => this.props.onClick( this.props.value[ 'clique_name' ] ) }>
          <strong>#{ this.props.value[ 'clique_name' ] }</strong><br/>
        </a>
      );
    }

  }
}

export default CliqueLink;
