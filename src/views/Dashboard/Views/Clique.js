import React, { Component } from 'react';
import {
  Card,
  Col, Container, ListGroup, Row
} from 'reactstrap';
import axios from "axios/index";
import { Button } from "rmwc/Button/index";
import PostList from "../PostList";

class Feeds extends Component {
  constructor( props ) {
    super( props );

    this.renderTitle = this.renderTitle.bind( this );
    this.subscribe = this.subscribe.bind( this );
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
            <p onClick={this.subscribe}><Button>Subscribe</Button></p>
          </Col></Row>
          <Row><Col>
            <p><Button>Unsubscribe</Button></p>
          </Col></Row>
        </Container>
      </Card>

    );
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
            <PostList data="clique"
                      param={this.props.clique_name}
                      onProfileClick={ this.props.onProfileClick }
                      onCliqueClick={ this.props.onCliqueClick }
                      onPostClick={ this.props.onPostClick }
            />
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
