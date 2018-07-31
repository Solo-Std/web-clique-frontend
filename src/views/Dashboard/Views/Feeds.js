import React, { Component } from 'react';
import { Col, ListGroup } from 'reactstrap';
import './Feeds.css';
import PostList from "../Lists/PostList";

class Feeds extends Component {
  render = () => {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          <ListGroup>
            <PostList data="all"/>
          </ListGroup>
        </div>
      </Col>
    );
  }
}

export default Feeds;
