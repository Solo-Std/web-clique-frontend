import React, { Component } from 'react';
import Feeds from './Views/Feeds';
import Post from "./Views/Post";
import Profile from "./Views/Profile";
// import IconLabelButtons from "./Views/Upload";

export const viewState = {
  HOME: 1,
  POST: 2,
  PROFILE: 3
};

class Dashboard extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      state: viewState.HOME,//debug disini, ganti profile
      post_id: 0,
      username: localStorage.getItem('username')
    };
  }

  render() {
    switch ( this.state.state ) {
      case viewState.HOME:
        return <Feeds onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                      onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
      case viewState.POST:
        return <Post id={ this.state.post_id } onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
      case viewState.PROFILE:
        return <Profile onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                        onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;

      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
