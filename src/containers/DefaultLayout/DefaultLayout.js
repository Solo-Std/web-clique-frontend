import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

import {
  AppHeader,
  AppSidebar
} from '@coreui/react';
import DefaultHeader from './DefaultHeader';
import './DefaultLayout.css';
import ChatConnection from "../../Chat/ChatConnection";
import API from '../../api';
import {Container} from "reactstrap";
import routes from "../../routes";



class DefaultLayout extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      valid_session: true,
      profile: false,
      sidebar: false,
      all: false,
      visiting_clique: 'gaming',
      sidebarCtr:0
    };
  }

  componentWillMount() {
    if ( localStorage.getItem( "session_token" ) === null ||
      localStorage.getItem( "username" ) === null ) {
      this.setState( { valid_session: false } );
    }
    else return API.post( `user_master/check_session`,
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

  logout = () => {
    localStorage.setItem( 'session_token', '' );
  }

  mainMenuRedirect = () =>
  {
    window.location.reload();
    console.log("main menu called!");
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
            <Sidebar/>
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/feeds" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
