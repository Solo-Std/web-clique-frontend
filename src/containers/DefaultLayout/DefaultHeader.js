import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from "../../assets/img/brand/logo.png";
import imgPlaceholder from "../../assets/img/profile-placeholder.jpg";
import {NavLink, Redirect} from "react-router-dom";
import "./DefaultLayout.css";
import API from "../../api";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      redirect: false,
      redirectToMainMenu: false,
      image:imgPlaceholder
    };

    this.loadImage = this.loadImage.bind(this);
  }

  loadImage(){
    API.post('user_master/get_image',{
      username: localStorage.getItem("username")
    }).then(res=>{
      if(res.data!=="FAILED"){
        this.setState( { image: res.data[ 'image_ext' ] + ',' + res.data[ 'image' ] } );
      }
      else this.setState({image: imgPlaceholder})
    })
  }

  componentWillMount(){
    this.loadImage();
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const { redirect } = this.state;
    if ( redirect )
      return <Redirect to='/login'></Redirect>;

    const { redirectToMainmenu } = this.state;
    if ( redirectToMainmenu ) return <Redirect to='/#'/>;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={ { src: logo, width: 175, height: 175, alt: 'CoreUI Logo' } }
          onClick={ () => {
            // this.setState({redirectToMainMenu:true})
            this.props.mainMenuRedirect();
          } }
          href="#"
        >

        </AppNavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="ml-auto" navbar>
          <div className="row">
            <div className="col-sm-6 notification">
              <NavItem className="d-md-down-none">
                { /*<NavLink href="#"><i className="icon-bell"/><Badge pill color="danger">100</Badge></NavLink>*/ }
              </NavItem>
            </div>
            <div className="displayName col-sm-6">{ localStorage.getItem( 'username' ) }</div>
          </div>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={ this.state.image } className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </DropdownToggle>
            <DropdownMenu right style={ { right: 'auto' } }>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"/> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"/> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"/> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"/> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <NavLink to={"/user/" + localStorage.getItem("username")}>
                <DropdownItem >
                    <i className="fa fa-user"/> Profile
                </DropdownItem>
              </NavLink>
              <DropdownItem onClick={ () => {
                this.props.logout();
                this.setState( { redirect: true } );
              } }><i className="fa fa-lock"/> Logout</DropdownItem>

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
