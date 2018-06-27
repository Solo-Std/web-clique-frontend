import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Sidebar from './Sidebar/Sidebar';

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
import Dashboard from "../../views/Dashboard";
import './DefaultLayout.css';
import ChatConnection from "../../Chat/ChatConnection";

class DefaultLayout extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      valid_session: true,
      profile:false,
      sidebar:false,
      all: false,
      visiting_clique:'gaming'
    };
    this.onSidebarCliqueClick = this.onSidebarCliqueClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
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

  onClick(){
    this.setState({profile:!this.state.profile});
    localStorage.setItem('visiting_profile',localStorage.getItem('username'));
  }

  onSidebarCliqueClick()
  {
    this.setState({sidebar:!this.state.sidebar});
    this.setState({all:false});
    this.setState({visiting_clique:localStorage.getItem("visiting_clique")});
    console.log('Clicked Clique: '+ localStorage.getItem("visiting_clique"));
  }

  onSidebarAllClick()
  {
    this.setState({sidebar: false});
    this.setState({all: true});
  }

  testAll(){
  }

  logout()
  {
    localStorage.setItem('session_token','');
  }

  render() {
    if ( this.state.valid_session === false ) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="app">
        <ChatConnection chatId={1}/>
        <AppHeader fixed>
          <DefaultHeader
            onClick={()=>{
            this.onClick()
          }}
          logout={()=>{this.logout()}}/>

        </AppHeader>
        <div className="app-body">
          <AppSidebar float="true" display="lg">
            <Sidebar
              onSidebarAllClick={()=>{this.onSidebarAllClick()}}
              onSidebarCliqueClick={()=>{this.onSidebarCliqueClick()}}/>
          </AppSidebar>
          <main className="main defaultlayout" >
            {/*<AppBreadcrumb appRoutes={ routes }/>*/}
            <Dashboard clique_name={localStorage.getItem("visiting_clique")} all={this.state.all} profile={this.state.profile} sidebar={this.state.sidebar}/>
            {/*<Container fluid>*/}
              {/*<Switch>*/}
                {/*{ routes.map( ( route, idx ) => {*/}
                    {/*return route.component ? (*/}
                        {/*<Route key={ J/idx } path={ route.path } exact={ route.exact } name={ route.name } render={ props => (*/}
                          {/*<route.component { ...props } />*/}
                        {/*) }/> )*/}
                      {/*: ( null );*/}
                  {/*},*/}
                {/*) }*/}
                {/*<Redirect from="/" to="/dashboard"/>*/}
              {/*</Switch>*/}
            {/*</Container>*/}
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
