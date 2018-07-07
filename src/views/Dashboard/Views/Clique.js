import React, { Component } from 'react';
import {
  Card,
  Col, Container, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';
import "./Clique.css";
import { Button } from "rmwc/Button/index";

class Feeds extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      items: [],
      sub: []
    };

    this.renderItem = this.renderItem.bind( this );
    this.renderTitle = this.renderTitle.bind( this );
    this.subscribe = this.subscribe.bind( this );
    this.checkSub = this.checkSub.bind( this );
  }

  componentDidUpdate() {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/get_clique_post/` + this.props.clique_name )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  componentWillMount()
  {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/get_clique_post/` + this.props.clique_name )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  renderItem() {
    let data = [];
    for ( let i = 0; i < this.state.items.length; i++ ) {
      data.push(
        <ListGroupItem>
          <Col xs={ "12" }>
            <Row>
              { /*<Col sm="1">*/ }
              <img src="https://picsum.photos/200" width="80" height="60"/>
              { /*</Col>*/ }
              <Col sm="10">
                <span className="font-lg" onClick={ () => this.props.onClick( this.state.items[ i ][ 'post_id' ] ) }>{ this.state.items[ i ][ 'post_title' ] }<br/></span>
                <a className="text-black-50 font-xs" href="#">
                  <strong>#{ this.state.items[ i ][ 'clique_name' ] }</strong>
                </a><br/>
                <span className="font-xs">Posted by <a className="text-info" onClick={ () => {this.props.onProfileClick(this.state.items[i][ 'username' ]);
                  localStorage.setItem("visiting_profile",this.state.items[i][ 'username' ])}}>@{ this.state.items[ i ][ 'username' ] }</a></span>
                <span className="font-xs">  <TimeAgo date={ this.state.items[ i ][ 'date_created' ] }/></span>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
    }
    return data;
  }

  renderTitle() {
    return (
      <Card>
        <Container>
          <Row>
            <Col>
              <h1>#{this.props.clique_name}</h1>
            </Col>
          </Row>
          <Row><Col>
            {this.renderSubButton()}
          </Col></Row>
        </Container>
      </Card>

    );
  }

  checkSub(){
    axios.get( `http://project-clique.herokuapp.com/index.php/api/subscribed_clique_relation/checksubscription/` + localStorage.getItem('user_id') + '/' + this.props.clique_name )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { sub: data } );
      } );
  }

  renderSubButton(){
    let data = [];

    this.checkSub();

    if(!this.state.sub){
      data.push(
        <Row><Col>
          <p onClick={this.subscribe}><Button>Subscribe</Button></p>
        </Col></Row>
      );
    }
    else{
      data.push(
        <Row><Col>
          <p><Button>Unsubscribe</Button></p>
        </Col></Row>
      );
    }

    return data;
  }

  subscribe(){
    console.log(localStorage.getItem('user_id') + " IS NOW SUBSCRIBED TO " + this.props.clique_name);
    axios.post( `http://project-clique.herokuapp.com/index.php/api/subscribed_clique_relation/`,
    {
      clique_name: this.props.clique_name,
      user_id: localStorage.getItem('user_id')
    })
      .then( res => {

      } )
      .catch( error => {
        console.log( error );
      } );
  }

  render() {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          { this.renderTitle() }
          <ListGroup>
            { this.renderItem() }
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
