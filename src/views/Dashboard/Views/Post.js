import React, { Component } from 'react';
import {
  Col, Container, FormGroup, Input, Label, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';

class Feeds extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      comments: [],
      posts: []
    };

    this.renderItem = this.renderItem.bind( this );
    this.renderReplies = this.renderReplies.bind( this );
  }

  componentWillMount() {
    axios.get( `http://localhost:8000/index.php/api/comment_master/` + this.props.id )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { comments: data } );
        console.log(this.state.comments);
      } );
    axios.get( `http://localhost:8000/index.php/api/post_master/` + this.props.id )
      .then( response => {
        this.setState( { posts: response.data } );
      } );
  }

  renderItem() {
    let data = [];
    for ( let i = 0; i < this.state.comments.length; i++ ) {
      data.push(
        <ListGroupItem tag="a" action>
          <Col xs={"12"}>
            <Row>
              <Col sm="12">
                <span className="font-xs">Posted by <a href="#">@{ this.state.comments[ i ][ 'username' ] }</a></span>
                <span className="font-xs">&nbsp;<TimeAgo date={ this.state.comments[ i ][ 'date_created' ] }/></span>
              </Col>
            </Row>
            <Row>
              <Col sm={ "12" }>
                <span className="font-sm">{ this.state.comments[ i ][ 'comment' ] }<br/></span>
              </Col>
            </Row>
            <Row>
              <Col sm={ "12" }>
                <a className="text-black-50" href={ "#" }><i className="fa fa-comment"/> Reply</a>
                &nbsp;
                <a className="text-black-50" href={ "#" }><i className="fa fa-thumbs-up"/> Like</a>
              </Col>
            </Row>
          </Col>
          {this.renderReplies(i)}
        </ListGroupItem>
      );
    }
    return data;
  }

  renderReplies(index){
    let data = [];
    for ( let i=0;i<this.state.comments[index]['replies'].length;i++) {
      data.push(
          <Col sm={"12"}>
            <div className="callout">
              <small className="text-muted">
                <a href="#">@{ this.state.comments[index]['replies'][i]['username'] }</a>
                &nbsp;<TimeAgo date={ this.state.comments[index]['replies'][i]['date_created'] }/>
              </small>
              <br/>
              <span>{ this.state.comments[index]['replies'][i]['reply'] }</span>
            </div>
          </Col>
      );
    }
    return data;
  }

  renderTitle() {
    return (
      <ListGroupItem>
        <Col xs={"12"}>
          <Row>
            <a className="text-black-50 font-xs" href="#">
              <strong>#{ this.state.posts[ 'clique_name' ] }</strong>
            </a><br/>
            <span className="font-xs">&nbsp;Posted by <a href="#">@{ this.state.posts[ 'username' ] }</a></span>
            <span className="font-xs">&nbsp;<TimeAgo date={ this.state.posts[ 'date_created' ] }/></span>
          </Row>
          <Row>
            <span className="font-lg">{ this.state.posts[ 'post_title' ] }<br/></span>
          </Row>
          <Row>
            <i className={ "fa fa-comment" }/>&nbsp;<span
            className="font-xs">{ this.state.comments.length } Comments<br/></span>
          </Row>
          <Row>
            <Col xs={ "12" }>
              <FormGroup>
                <Label for="exampleText">Comment</Label>
                <Input type="textarea" name="text" id="exampleText"/>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </ListGroupItem>
    );
  }

  render() {
    return (
      <Col xs={ "12" }>
        { this.renderTitle() }
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
