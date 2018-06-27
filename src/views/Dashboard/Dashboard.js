import React, { Component } from 'react';
import Feeds from './Views/Feeds';
import Post from "./Views/Post";
import Profile from "./Views/Profile";
import CreatePost from "./Views/CreatePost";
import Clique from "./Views/Clique";

export const viewState = {
  HOME: 1,
  POST: 2,
  PROFILE: 3,
  CREATE_POST: 4,
  CLIQUE: 5,
  CREATE_CLIQUE: 6
};

class Dashboard extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      state: viewState.HOME,//debug disini, ganti profile
      post_id: 0,
      username: localStorage.getItem( 'username' ),
      clique_name: props.clique_name
    };
  }

  render() {
    if ( this.props.profile && this.state.state !== viewState.PROFILE ) {
      this.setState( { state: viewState.PROFILE } );
    }

    else if ( this.props.all && this.state.state !== viewState.HOME ) {
      this.setState( { state: viewState.HOME } );
    }

    else if ( this.props.sidebar && this.state.state !== viewState.CLIQUE ) {
      this.setState( { state: viewState.CLIQUE } );
    }

    else if ( this.props.sidebar && this.state.state === viewState.CLIQUE ) {
      return <Clique clique_name={ localStorage.getItem( "visiting_clique" ) }
                     onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                     onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
      />;
    }

    switch ( this.state.state ) {
      case viewState.HOME:
        return <Feeds onPostClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                      onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
                      onCliqueClick={ d => this.setState( { state: viewState.CLIQUE, clique_name: d } ) }/>;
      case viewState.POST:
        return <Post id={ this.state.post_id }
                     onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }/>;
      case viewState.PROFILE:
        return <Profile onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                        onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }/>;
      case viewState.CREATE_POST:
        return <CreatePost/>;
      case viewState.CLIQUE:
        return <Clique clique_name={ this.state.clique_name }
                       onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                       onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
        />;
      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
