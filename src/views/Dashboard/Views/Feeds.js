import React, { Component } from 'react';
import { Col, ListGroup } from 'reactstrap';
import './Feeds.css';
import PostList from "../Lists/PostList";
import isLoggedIn from "../../../HOC/isLoggedIn";

class UnwrappedFeeds extends Component {
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

const Feeds = isLoggedIn(UnwrappedFeeds)

export default Feeds;
