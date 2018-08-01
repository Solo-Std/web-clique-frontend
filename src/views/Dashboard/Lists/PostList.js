import React, { Component } from 'react'
import { Col, ListGroupItem, Row } from "reactstrap"
import CliqueLink from "../Links/CliqueLink"
import PostLink from "../Links/PostLink"
import ProfileLink from "../Links/ProfileLink"

class PostList extends Component {
  render() {
    let data = [];
    let items = [];

    if(this.props.type==="all")
      items = this.props.items
    else if(this.props.type==="clique")
      items = this.props.items.filter(d=>d['clique_name']===this.props.params)
    else if(this.props.type==="profile")
      items = this.props.items.filter(d=>d['username']===this.props.params)

    console.log(this.props.items)
    if ( items.length > 0 ) {
      items.forEach( ( item, idx ) => {
        data.push(
          <ListGroupItem key={ idx }>
            <Col xs={ "12" }>
              <Row>
                <img src="https://picsum.photos/200" width="80" height="60" alt={ "cannot load" }/>
                <Col sm="10">
                  <PostLink value={ item }/>
                  <CliqueLink value={ item }/>
                  <ProfileLink value={ item }/>
                </Col>
              </Row>
            </Col>
          </ListGroupItem>
        );
      } );
      return data;
    }
    else if ( items.length === 0 ) {
      data.push(
        <ListGroupItem key={ 0 }>
          <Col xs={ "12" }>
            <Row>
              <Col sm="10">
                <p>
                  You have no posts yet :(</p>
              </Col>
            </Row>
          </Col>
        </ListGroupItem>
      );
      return data;
    }
  }
}

export default PostList;
