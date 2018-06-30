import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

class ProfileLink extends Component {
  render() {
    return (
      <span className="font-xs">Posted by&nbsp;
        <a className="text-info" onClick={ () => {
          this.props.onClick( this.props.value[ 'username' ] );
          localStorage.setItem( "visiting_profile", this.props.value[ 'username' ] );
        } }>
          @{ this.props.value[ 'username' ] }
        </a>
        &nbsp;
        <span className="font-xs">
          <TimeAgo date={ this.props.value[ 'date_created' ] }/>
        </span>
      </span>
    );
  }
}

export default ProfileLink;
