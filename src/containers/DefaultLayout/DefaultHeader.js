import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import {Redirect} from "react-router-dom";
import './DefaultLayout.css';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      redirect:false
    };
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const {redirect} = this.state;
    if(redirect)
      return <Redirect to='/login'></Redirect>;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 175, height: 175, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <div className="row">
            <div className="col-sm-6 notification">
              <NavItem className="d-md-down-none">
                {/*<NavLink href="#"><i className="icon-bell"/><Badge pill color="danger">100</Badge></NavLink>*/}
              </NavItem>
            </div>

            <div className="displayName col-sm-6">{localStorage.getItem('username')}</div>


          </div>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"/> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"/> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"/> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"/> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem  onClick={ () =>    {
                this.props.onClick()
              }}> <i className="fa fa-user"/> Profile</DropdownItem>
              {/*<DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-usd"/> Payments<Badge color="secondary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem><i className="fa fa-file"/> Projects<Badge color="primary">42</Badge></DropdownItem>*/}
              {/*<DropdownItem divider />*/}
              {/*<DropdownItem><i className="fa fa-shield"/> Lock Account</DropdownItem>*/}
              <DropdownItem  onClick={ () => {
                this.props.logout(); this.setState({redirect:true})
              }}><i className="fa fa-lock"/> Logout</DropdownItem>

            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
