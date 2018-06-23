import React, { Component } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';
import './Profile.css';
import IconLabelButtons from "./Upload.js";

class Profile extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      items: [],
      name :[]
    };


    this.renderItem = this.renderItem.bind( this );
    this.renderName = this.renderName.bind(this);
  }

  componentWillMount() {
    axios.get( `http://localhost:8000/index.php/api/fetch_user_posts/1` )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
         this.setState( { items: data } );
       } );

    axios.get(`http://localhost:8000/index.php/api/user_master/`)
      .then( response =>
        {
          let data = [];
          response.data.map((content, index) => data[ index ] = content);
          this.setState({name: data});
        }

      );
   }

  renderItem() {
    let data = [];
    console.log( this.state.items );
    for ( let i = 0; i < this.state.items.length; i++ ) {
      data.push(
        <ListGroupItem tag="a" onClick={ () => this.props.onClick( this.state.items[ i ][ 'post_id' ] ) }>
          <Col xs={"12"}>
            <Row>
              { /*<Col sm="1">*/ }
              <img src="https://picsum.photos/200" width="80" height="60"/>
              { /*</Col>*/ }
              <Col sm="10">
                <span className="font-lg">{ this.state.items[ i ][ 'post_title' ] }<br/></span>
                <a className="text-black-50 font-xs" href="#">
                  <strong>#{ this.state.items[ i ][ 'clique_name' ] }</strong>
                </a><br/>
                <span className="font-xs">Posted by <a href="#">@{ this.state.items[ i ][ 'username' ] }</a></span>
                <span className="font-xs">  <TimeAgo date={ this.state.items[ i ][ 'date_created' ] }/></span>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
    }
    return data;
  }


  renderName()
  {
    let data =[];
    console.log(this.state.name);
    if(this.state.name.length >0 )data.push(this.state.name[1][ 'username' ]) ;
    return data;
  }

  render() {
    //console.log( "render()" );
    //console.log( this.state.items );
    return(
      <div className="card">
        <div className="card-body">
          <Row>
            {/*<Row>*/}
            <Col sm="1">
              <img className="profile-picture" src="https://picsum.photos/100" width="150%" height="100%"/>
            </Col>
            <Col sm="6" className="padding1">
              <div className="container">
                <h1 className="display-5 ">Welcome,{this.renderName()}!</h1>
                <p className="lead">View and edit your personal info.</p>
              </div>
            </Col>
          </Row>

          <div>
            <IconLabelButtons/>
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
          {/*<div className="jumbotron jumbotron-fluid">*/}
          <h1 class="display-5">Recent Posts</h1>
            <Col sm={ "12" }>
              <div className="animated fadeIn">
                <ListGroup>
                  { this.renderItem() }
                </ListGroup>
              </div>
            </Col>
          {/*</div>*/}
        </div>

      </div>
    );
  }
}

export default Profile;
