import React, {Component} from 'react';
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
import isLoggedIn from "../../HOC/isLoggedIn";


class UnwrappedDefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid_session: true,
      profile: false,
      sidebar: false,
      all: false,
      visiting_clique: 'gaming',
      sidebarCtr: 0
    };
  }

  render() {
    return (
      <div className="app">
        <ChatConnection chatId={1}/>
        <AppHeader fixed>
          <DefaultHeader/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar float="true" display="lg">
            <Sidebar/>
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                        <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                          <route.component {...props} />
                        )}/>)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/feeds"/>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

const DefaultLayout = isLoggedIn(UnwrappedDefaultLayout)

export default DefaultLayout;
