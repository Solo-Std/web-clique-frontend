import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultHeader from './DefaultHeader';
import axios from "axios/index";

class DefaultLayout extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      valid_session: true
    };
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

  render() {
    if ( this.state.valid_session === false ) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar float="true" display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <AppSidebarNav navConfig={ navigation } { ...this.props } />
            <AppSidebarFooter/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={ routes }/>
            <Container fluid>
              <Switch>
                { routes.map( ( route, idx ) => {
                    return route.component ? (
                        <Route key={ idx } path={ route.path } exact={ route.exact } name={ route.name } render={ props => (
                          <route.component { ...props } />
                        ) }/> )
                      : ( null );
                  },
                ) }
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
