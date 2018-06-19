import React, { Component } from 'react';
import {
  Col, Container, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TimeAgo from 'react-timeago';
import TextEditor from "./Components/TextEditor";
import { Ripple } from "rmwc/Ripple";

class Post extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      comments: [],
      posts: [],
      editor:-1
    };

    this.renderItem = this.renderItem.bind( this );
    this.renderReplies = this.renderReplies.bind( this );
    this.postComment = this.postComment.bind( this );
    this.postReply = this.postReply.bind( this );
  }

  postComment(content){
    return axios.post(`http://localhost:8000/index.php/api/comment_master/insert`,
      {
        comment: content,
        user_id: 1,
        post_id: this.props.id
      })
      .then(res => {
        if(res.data === "SUCCESS"){
          axios.get( `http://localhost:8000/index.php/api/comment_master/` + this.props.id )
            .then( response => {
              let data = [];
              response.data.map( ( content, index ) => data[ index ] = content );
              this.setState( { comments: data } );
            } );
        }
        else if(res.data === "FAILED"){

        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  postReply(content){

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
      if(this.state.comments[i].length !== 0)
      data.push(
        <div>
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
                  <div dangerouslySetInnerHTML={{__html:this.state.comments[ i ][ 'comment' ]}}/>
                </Col>
              </Row>
              <Row>
                <Col sm={ "12" }>
                  <a className="text-black-50 font-sm" onClick={() => this.setState({editor:i})}><i className="material-icons font-sm">mode_comment</i> Reply</a>
                  &nbsp;
                  <a className="text-black-50 font-sm" href={ "#" }><i className="material-icons font-sm">thumb_up</i> Like</a>
                </Col>
              </Row>
            </Col>
            {this.renderTextEditor(this.state.editor === i)}
            {this.renderReplies(i)}
          </ListGroupItem>
        </div>
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
                <Ripple unbounded>
                  <span className="button" onClick={() => this.setState({editor:index})}><i className="material-icons font-sm">reply</i></span>
                </Ripple>
                &nbsp;
                <a href="#">@{ this.state.comments[index]['replies'][i]['username'] }</a>
                &nbsp;
                <TimeAgo date={ this.state.comments[index]['replies'][i]['date_created'] }/>
              </small>
              <br/>
              <span>
                <div dangerouslySetInnerHTML={{__html:this.state.comments[index]['replies'][i]['reply']}}/>
              </span>
            </div>
          </Col>
      );
    }
    return data;
  }

  renderTextEditor(isActive){
    if(isActive)
      return (
        <ListGroupItem>
          <Container>
            <TextEditor onSubmit={this.postComment}/>
          </Container>
        </ListGroupItem>
      );
    else return null;
  }

  renderTitle() {
    return (
      <div>
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
              <i className="material-icons font-sm">mode_comment</i>&nbsp;<span
              className="font-xs">{ this.state.comments.length } Comments<br/></span>
            </Row>
          </Col>
        </ListGroupItem>
        {this.renderTextEditor(this.state.editor === -1)}
      </div>
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

export default Post;
