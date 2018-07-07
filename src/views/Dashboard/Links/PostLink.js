import React, { Component } from 'react';

class PostLink extends Component {
  render() {
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

export default PostLink;
