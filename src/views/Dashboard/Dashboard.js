import React, { Component } from 'react';
import Feeds from './Views/Feeds';
import Post from "./Views/Post";
import Profile from "./Views/Profile";
import CreatePost from "./Views/CreatePost";
import Clique from "./Views/Clique";
// import IconLabelButtons from "./Views/Upload";

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
      username: localStorage.getItem('username'),
      clique_name:'all'
    };
  }

  render() {
    switch ( this.state.state ) {
      case viewState.HOME:
        return <Feeds onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                      onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}
                      onCliqueClick={d=>this.setState({state:viewState.CLIQUE, clique_name:d})}/>;
      case viewState.POST:
        return <Post id={ this.state.post_id } onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
      case viewState.PROFILE:
        return <Profile onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                        onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
        // return<IconLabelButtons/>;
      case viewState.CREATE_POST:
        return <CreatePost/>;
      case viewState.CLIQUE:
        return <Clique clique_name={this.state.clique_name} onClick={ d => this.setState( { state: viewState.POST, post_id: d } )}/>;
      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
