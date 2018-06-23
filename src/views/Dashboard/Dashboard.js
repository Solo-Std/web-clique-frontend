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
<<<<<<< HEAD
      state: viewState.CLIQUE,//debug disini, ganti profile
      post_id: 0,
      clique_name:'all'
=======
      state: viewState.HOME,//debug disini, ganti profile
      post_id: 0,
      username: localStorage.getItem('username')
>>>>>>> b9d2108a5a758cd5088689cb4e497cf446bf8d05
    };
  }

  render() {
    switch ( this.state.state ) {
      case viewState.HOME:
<<<<<<< HEAD
        return <Feeds onCliqueClick={d=>this.setState({state:viewState.CLIQUE, clique_name:d})}
                      onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }/>;
=======
        return <Feeds onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                      onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
>>>>>>> b9d2108a5a758cd5088689cb4e497cf446bf8d05
      case viewState.POST:
        return <Post id={ this.state.post_id } onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;
      case viewState.PROFILE:
<<<<<<< HEAD
        return <Profile onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }/>;
        // return<IconLabelButtons/>;
      case viewState.CREATE_POST:
        return <CreatePost/>;
      case viewState.CLIQUE:
        return <Clique clique_name={this.state.clique_name} onClick={ d => this.setState( { state: viewState.POST, post_id: d } )}/>;
=======
        return <Profile onClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                        onProfileClick={ d => this.setState({state: viewState.PROFILE, username:d})}/>;

>>>>>>> b9d2108a5a758cd5088689cb4e497cf446bf8d05
      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
