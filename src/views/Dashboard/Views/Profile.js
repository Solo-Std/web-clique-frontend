import React, { Component } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';
import './Profile.css';
import IconLabelButtons from "./Upload.js";
import { Button } from "rmwc/Button/index";
import ContentLoader from 'react-content-loader';

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
      items: [],
      name: [],
      userState: userState.LOADING
    };

    this.renderItem = this.renderItem.bind( this );
    this.renderName = this.renderName.bind( this );
    this.is_friend = this.is_friend.bind( this );
    this.unfriend = this.unfriend.bind( this );
    this.add_friend = this.add_friend.bind( this );
    this.showUploadButton = this.showUploadButton.bind( this );
  }

  unfriend() {
    return axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/unfriend',{
      visitor:localStorage.getItem( "username" ),
      visited:localStorage.getItem( "visiting_profile" )
    } )
      .then(()=>{
            this.setState( { userState: userState.NON_FRIEND } );
      });
  }

  add_friend() {
    return axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/add_friend',{
      visitor:localStorage.getItem( "username" ),
      visited:localStorage.getItem( "visiting_profile" )
    } )
      .then(()=>{
          this.setState( { userState: userState.FRIEND } );
      });
  }

  is_friend() {
    return axios.post( 'http://project-clique.herokuapp.com/index.php/api/user_friends_relation/is_friend',{
      visitor:localStorage.getItem( "username" ),
      visited:localStorage.getItem( "visiting_profile" )
    })
      .then( response => {
            if ( response.data === "SUCCESS" )
              this.setState( { userState: userState.FRIEND } );
            else if ( response.data === "FAILED" )
              this.setState( { userState: userState.NON_FRIEND } );
      } );
  }

  componentWillMount() {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/fetch_user_posts/` + localStorage.getItem( 'visiting_profile' ) )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );

    if ( localStorage.getItem( 'username' ) === localStorage.getItem( 'visiting_profile' ) )
      this.setState( { userState: userState.CURRENT } );
    else {
      this.is_friend();
    }
  }

  renderItem() {
    let data = [];
    this.state.items.forEach((item,idx)=>{
      data.push(
        <ListGroupItem key={idx}>
          <Col xs={ "12" }>
            <Row>
              { /*<Col sm="1">*/ }
              <img src="https://picsum.photos/200" width="80" height="60" alt={"cannot load"}/>
              { /*</Col>*/ }
              <Col sm="10">
                <span className="font-lg"
                      onClick={ () => this.props.onClick( item[ 'post_id' ] ) }>{ item[ 'post_title' ] }<br/></span>
                <a className="text-black-50 font-xs" >
                  <strong>#{ item[ 'clique_name' ] }</strong>
                </a><br/>
                <span className="font-xs">Posted by <a className="text-info" onClick={ () => {
                  this.props.onProfileClick( item[ 'username' ] );
                  localStorage.setItem( "visiting_profile", item[ 'username' ] );
                } }>@{ item[ 'username' ] }</a></span>
                <span className="font-xs">  <TimeAgo date={ item[ 'date_created' ] }/></span>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
    });
    return data;
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
          <ContentLoader
            speed={ 2 }>
            <rect x="45.44" y="117.27" rx="0" ry="0" width="104" height="32"/>
          </ContentLoader>
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
            { /*<Row>*/ }
            <Col sm="1">
              <img className="profile-picture" alt={"cannot load"} src="https://picsum.photos/100" width="150%" height="100%"/>
            </Col>
            <Col sm="6" className="padding1">
              { this.renderName() }
            </Col>
          </Row>

          <div>
            { this.showUploadButton() }
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="callout callout-info">
                <small className="text-muted">Posts</small>
                <br/>
                <strong className="h4">9,123</strong>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="callout callout-danger">
                <small className="text-muted">Comments</small>
                <br/>
                <strong className="h4">22,643</strong>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="callout callout-warning">
                <small className="text-muted">Upvotes</small>
                <br/>
                <strong className="h4">78,623</strong>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="callout callout-success">
                <small className="text-muted">Karma</small>
                <br/>
                <strong className="h4">49,123</strong>
              </div>
            </div>

          </div>
        </div>

        <br/>

        <div className="card-body">
          <h1 className="display-5">Recent Posts</h1>
          <Col sm={ "12" }>
            <div className="animated fadeIn">
              <ListGroup>
                { this.renderItem() }
              </ListGroup>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

export default Profile;
