import React, {PureComponent} from 'react';
import Feeds from './Views/Feeds';
// import IconLabelButtons from "./Views/Upload";


export const viewState = {
  HOME: 1,
  POST: 2,
  PROFILE: 3,
  CREATE_POST: 4,
  CLIQUE: 5,
  CREATE_CLIQUE: 6,
  EDIT_PASSWORD: 7
};

class Dashboard extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      state: viewState.HOME,
      post_id: 0,
      username: localStorage.getItem( 'username' ),
      clique_name: props.clique_name,
      sidebarCtr:0
    };
  }

  render() {
    return <Feeds onPostClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
                  onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
                  onCliqueClick={ d => this.setState( { state: viewState.CLIQUE, clique_name: d } ) }/>;
    // if ( this.props.profile && this.state.state !== viewState.PROFILE ) {
    //   this.setState( { state: viewState.PROFILE } );
    // }
    //
    // else if ( this.props.all && this.state.state !== viewState.HOME ) {
    //   this.setState( { state: viewState.HOME } );
    // }
    //
    // else if ( this.props.sidebar && this.state.state !== viewState.CLIQUE ) {
    //   this.setState( { state: viewState.CLIQUE } );
    // }
    //
    // else if ( this.props.sidebar && this.state.state === viewState.CLIQUE
    //    && this.props.sidebarCtr>this.state.sidebarCtr
    // ) {
    //    this.setState({clique_name:localStorage.getItem('visiting_clique')});
    //    this.setState({sidebarCtr:this.state.sidebarCtr+1});
    // }
    //
    // switch ( this.state.state ) {
    //   case viewState.PROFILE:
    //     return <Profile onPostClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
    //                     onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
    //                     onCliqueClick={ d => this.setState( { state: viewState.CLIQUE, clique_name: d } ) }/>;
    //   case viewState.CREATE_POST:
    //     return <CreatePost/>;
    //   case viewState.CLIQUE:
    //     return <Clique clique_name={ this.state.clique_name }
    //                    onPostClick={ d => this.setState( { state: viewState.POST, post_id: d } ) }
    //                    onCliqueClick={ d => this.setState( { state: viewState.CLIQUE, clique_name: d } ) }
    //                    onProfileClick={ d => this.setState( { state: viewState.PROFILE, username: d } ) }
    //                    onCreatePostClick={ d => this.setState({state: viewState.CREATE_POST, clique_name: d} ) }
    //     />;
    //   case viewState.EDIT_PASSWORD:
    //     return <EditPassword />
    //   default:
    //     return <Feeds/>;
    // }
  }
}

export default Dashboard;
