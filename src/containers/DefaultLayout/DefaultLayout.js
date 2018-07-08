import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

import {
  AppHeader,
  AppSidebar
} from '@coreui/react';
import DefaultHeader from './DefaultHeader';
import axios from "axios/index";
import Dashboard from "../../views/Dashboard";
import './DefaultLayout.css';
import ChatConnection from "../../Chat/ChatConnection";



class DefaultLayout extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      valid_session: true,
      profile: false,
      sidebar: false,
      all: false,
      visiting_clique: 'gaming'
    };
    this.onSidebarCliqueClick = this.onSidebarCliqueClick.bind( this );
    this.onClick = this.onClick.bind( this );
    this.logout = this.logout.bind( this );
    this.mainMenuRedirect = this.mainMenuRedirect.bind(this);
  }

  componentWillMount() {
    if ( localStorage.getItem( "session_token" ) === null ||
      localStorage.getItem( "username" ) === null ) {
      this.setState( { valid_session: false } );
    }
    else return axios.post( `http://project-clique.herokuapp.com/index.php/api/user_master/check_session`,
      {
        session_token: localStorage.getItem( "session_token" ),
        username: localStorage.getItem( "username" )
      } )
      .then( res => {
        if ( res.data === "SUCCESS" )
          this.setState( { valid_session: true } );
        else
          this.setState( { valid_session: false } );
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  onClick() {
    this.setState( { profile: !this.state.profile } );
    localStorage.setItem( 'visiting_profile', localStorage.getItem( 'username' ) );
  }

  onSidebarCliqueClick() {
    this.setState( { sidebar: !this.state.sidebar } );
    this.setState( { all: false } );
    this.setState( { visiting_clique: localStorage.getItem( "visiting_clique" ) } );
    console.log( 'Clicked Clique: ' + localStorage.getItem( "visiting_clique" ) );
  }

  onSidebarAllClick() {
    this.setState( { sidebar: false } );
    this.setState( { all: true } );
  }

  logout() {
    localStorage.setItem( 'session_token', '' );
  }

  mainMenuRedirect()
  {
    window.location.reload();
    console.log("main menu called!");
  //  main menu stuff here
  }

  render() {
    if ( this.state.valid_session === false ) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="app">
        <ChatConnection chatId={ 1 }/>
        <AppHeader fixed>
          <DefaultHeader
            onClick={ () => {
              this.onClick();
            } }
            logout={ () => {
              this.logout();
            } }
            mainMenuRedirect={
              ()=>{this.mainMenuRedirect();}
            }
          />
        </AppHeader>
        <div className="app-body">
          <AppSidebar float="true" display="lg">
            <Sidebar
              onSidebarAllClick={ () => {
                this.onSidebarAllClick();
              } }
              onSidebarCliqueClick={ () => {
                this.onSidebarCliqueClick();
              } }/>
          </AppSidebar>
          <main className="main defaultlayout">
            <Dashboard clique_name={ localStorage.getItem( "visiting_clique" ) }
                       all={ this.state.all }
                       profile={ this.state.profile }
                       sidebar={ this.state.sidebar }/>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
