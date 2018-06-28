import React, { Component } from 'react';
import { Col, ListGroup } from 'reactstrap';
import './Feeds.css';
import PostList from "../PostList";

class Feeds extends Component {
  render() {
    return (
      <Col sm={ "12" }>
        <div className="animated fadeIn">
          <ListGroup>
            <PostList data="all"
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
