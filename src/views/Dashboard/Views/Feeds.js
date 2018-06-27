import React, { Component } from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import './Feeds.css';
import CliqueLink from "../Links/CliqueLink";
import PostLink from "../Links/PostLink";
import ProfileLink from "../Links/ProfileLink";

class Feeds extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      items: []
    };

    this.renderItem = this.renderItem.bind( this );
  }

  componentWillMount() {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/post_master/` )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { items: data } );
      } );
  }

  renderItem() {
    let data = [];
    this.state.items.forEach( ( item, idx ) => {
      data.push(
        <ListGroupItem key={ idx }>
          <Col xs={ "12" }>
            <Row>
              <img src="https://picsum.photos/200" width="80" height="60" alt={ "cannot load" }/>
              <Col sm="10">
                <PostLink onClick={ this.props.onPostClick }
                          value={ item }/>
                <CliqueLink onClick={ this.props.onCliqueClick }
                            value={ item }/>
                <ProfileLink onClick={ this.props.onProfileClick }
                             value={ item }/>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
    } );
    return data;
  }


  render() {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          <ListGroup>
            { this.renderItem() }
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
