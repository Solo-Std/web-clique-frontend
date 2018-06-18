import React, { Component } from 'react';
import Feeds from './Views/Feeds';
import Post from "./Views/Post";

export const viewState = {
  HOME: 1,
  POST: 2
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      state:viewState.HOME,
      post_id:0
    };
  }

  render()
  {
    switch ( this.state.state ) {
      case viewState.HOME:
        return <Feeds onClick={d=>this.setState({state:viewState.POST,post_id:d})}/>;
      case viewState.POST:
        return <Post id={this.state.post_id}/>;
      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
