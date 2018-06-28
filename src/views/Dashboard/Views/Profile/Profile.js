import React, { Component } from 'react';
import {
  Button,
  Col, ListGroup, Row
} from 'reactstrap';
import axios from "axios/index";
import './Profile.css';
import IconLabelButtons from "../Upload.js";
import { Image } from "react-bootstrap";
import Callout from "./Callout";
import PostList from "../../PostList";

const userState = {
  LOADING: 1,
  CURRENT: 2,
  FRIEND: 3,
  NON_FRIEND: 4
};

class Profile extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      name: [],
      userState: userState.LOADING
    };

    this.renderName = this.renderName.bind( this );
    this.is_friend = this.is_friend.bind( this );
    this.unfriend = this.unfriend.bind( this );
    this.add_friend = this.add_friend.bind( this );
    this.showUploadButton = this.showUploadButton.bind( this );
  }

  async unfriend() {
    try{
      this.setState( { userState: userState.LOADING } );
      await axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/unfriend',{
        visitor:localStorage.getItem( "username" ),
        visited:localStorage.getItem( "visiting_profile" )
      } );
      this.is_friend();
    }
    catch ( e ) {
      console.warn(e);
    }
  }

  async add_friend() {
    try{
      this.setState( { userState: userState.LOADING } );
      await axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/add_friend',{
        visitor:localStorage.getItem( "username" ),
        visited:localStorage.getItem( "visiting_profile" )
      } );
      this.is_friend();
    }catch ( e ) {
      console.warn(e);
    }
  }

  async is_friend() {
    try{
      const response = await axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/is_friend',{
        visitor:localStorage.getItem( "username" ),
        visited:localStorage.getItem( "visiting_profile" )
      });
      if ( response.data === "SUCCESS" )
        this.setState( { userState: userState.FRIEND } );
      else if ( response.data === "FAILED" )
        this.setState( { userState: userState.NON_FRIEND } );
    }
    catch ( e ) {
      console.warn(e);
    }
  }

  componentWillMount() {
    if ( localStorage.getItem( 'username' ) === localStorage.getItem( 'visiting_profile' ) )
      this.setState( { userState: userState.CURRENT } );
    else {
      this.is_friend();
    }
  }

  renderName() {
    if ( localStorage.getItem( 'username' ) === localStorage.getItem( 'visiting_profile' ) )
      return ( <div className="container"><h1
        className="display-5">Welcome, { localStorage.getItem( 'visiting_profile' ) }!</h1>
        <p className="lead">View and edit your personal info.</p></div> );
    else
      return ( <div className="container"><h1 className="display-5">{ localStorage.getItem( 'visiting_profile' ) }'s
        Profile</h1></div> );
  }

  showUploadButton() {
    switch ( this.state.userState ) {
      case userState.LOADING:
        return (
         <Button disabled active={false}>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         </Button>
        );
      case userState.CURRENT:
        return <IconLabelButtons/>;
      case userState.FRIEND:
        return <Button onClick={ this.unfriend }>Unfriend</Button>;
      case userState.NON_FRIEND:
        return <Button onClick={ this.add_friend }>Add Friend</Button>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <Row>
            <Col xs="3" md="1">
              <Image alt={"cannot load"} src="https://picsum.photos/100" circle responsive/>
            </Col>
            <Col xs="9" md="11" >
              { this.renderName() }
              { this.showUploadButton() }
            </Col>
          </Row>

          <Row>
            <Callout text="Posts" value="9241" color="blue"/>
            <Callout text="Comments" value="22,643" color="red"/>
            <Callout text="Upvotes" value="78,623" color="yellow"/>
            <Callout text="Karma" value="49,123" color="green"/>
          </Row>
        </div>

        <br/>

        <div className="card-body">
          <h1 className="display-5">Recent Posts</h1>
          <Col sm={ "12" }>
            <div className="animated fadeIn">
              <ListGroup>
                <PostList data="profile"
                          param={localStorage.getItem("visiting_profile")}
                          onProfileClick={ this.props.onProfileClick }
                          onCliqueClick={ this.props.onCliqueClick }
                          onPostClick={ this.props.onPostClick }
                />
              </ListGroup>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

export default Profile;
