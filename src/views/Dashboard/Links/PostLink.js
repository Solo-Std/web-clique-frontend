import React, { Component } from 'react';
import Skeleton from 'react-skeleton-loader';
class PostLink extends Component {
  render() {
    if(this.props.loading==true)
    {
      console.log("Post Link loading");
      return(
        <span className="font-lg">
          <Skeleton width="25%" height="10px"/>
        <br/>
      </span>
      );
    }
    else {
      return (

        <span className="font-lg">
        <a onClick={ () => this.props.onClick( this.props.value[ 'post_id' ] ) }>
          { this.props.value[ 'post_title' ] }
        </a>
        <br/>
      </span>
      );
    }

  }
}

export default PostLink;
