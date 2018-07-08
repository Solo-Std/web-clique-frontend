import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import Skeleton from 'react-skeleton-loader';

class ProfileLink extends Component {
  render() {
    if(this.props.loading ==  true)
    {
      console.log("Profile Link loading");
      return(
        <span >&nbsp;
          <Skeleton width="25%" height="10px"/>
            {/*{ this.props.value[ 'username' ] }*/}
        {/*</a>*/}
          &nbsp;
          <span >
          {/*<TimeAgo date={ this.props.value[ 'date_created' ] }/>*/}

            <Skeleton width="25%" height="10px"/>
        </span>
      </span>
      );
    }

    else
    {
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
}

export default ProfileLink;
