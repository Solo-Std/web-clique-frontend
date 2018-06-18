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
      state:viewState.POST
    };
  }

  render()
  {
    switch ( this.state.state ) {
      case viewState.HOME:
        return <Feeds/>;
      case viewState.POST:
        return <Post/>;
      default:
        return <Feeds/>;
    }
  }
}

export default Dashboard;
