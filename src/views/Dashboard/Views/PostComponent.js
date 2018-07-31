import React, { Component } from 'react';
import {
  Col, Container, ListGroup, ListGroupItem, Row
} from 'reactstrap';
import API from "../../../api";
import TimeAgo from 'react-timeago';
import TextEditor from "./Components/TextEditor";
import { Ripple } from "rmwc/Ripple";
import ProfileLink from "../Links/ProfileLink";
import CliqueLink from "../Links/CliqueLink";

class PostComponent extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      comments: [],
      posts: [],
      editor: -1
    };
  }

  getCommentsCount = () => {
    let length = this.state.comments.length;
    if ( length === 1 )
      return "1 Comment";
    else
      return length + " Comments";
  }

  getRepliesCount = ( index ) => {
    let length;
    if ( this.state.comments[ index ][ 'replies' ].length > 0 ) {
      length = this.state.comments[ index ][ 'replies' ].length;
      if ( length === 1 )
        return "1 Reply";
      else
        return length + " Replies";
    }
    else return "Reply";
  }

  postComment =( content ) =>{
    return API.post( `comment_master/insert`,
      {
        comment: content,
        username: localStorage.getItem("username"),
        post_id: this.props.id
      } )
      .then( res => {
        if ( res.data === "SUCCESS" ) {
          API.post( `comment_master/`,{
            id:this.props.id
          } )
            .then( response => {
              let data = [];
              response.data.map( ( content, index ) => data[ index ] = content );
              this.setState( { comments: data } );
            } );
        }
        else if ( res.data === "FAILED" ) {

        }
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  postReply = ( content ) => {
    return API.post( `reply_master/insert`,
      {
        reply: content,
        username: localStorage.getItem("username"),
        comment_id: this.state.editor
      } )
      .then( res => {
        if ( res.data === "SUCCESS" ) {
          API.post( `comment_master/`,{
            id: this.props.id
          })
            .then( response => {
              let data = [];
              response.data.map( ( content, index ) => data[ index ] = content );
              this.setState( { comments: data } );
            } );
        }
        else if ( res.data === "FAILED" ) {

        }
      } )
      .catch( error => {
        console.log( error );
      } );
  }

  componentWillMount() {
    API.post( `comment_master/`,{
      id: this.props.id
    } )
      .then( response => {
        let data = [];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { comments: data } );
      } );
    API.post( `post_master/`,{
      id: this.props.id
    })
      .then( response => {
        this.setState( { posts: response.data } );
      } );
  }

  renderItem = () => {
    let data = [];
    this.state.comments.forEach((comment,idx)=>{
      if ( comment.length !== 0 )
        data.push(
          <div key={idx}>
            <ListGroupItem action>
              <Col xs={ "12" }>
                <Row>
                  <Col sm="12">
                    <ProfileLink onClick={ this.props.onProfileClick }
                                 value={ comment }/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ "12" }>
                    <div dangerouslySetInnerHTML={ { __html: comment[ 'comment' ] } }/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ "12" }>
                    <a className="text-black-50 font-sm" onClick={ () => this.setState( { editor: comment[ 'comment_id' ] } ) }>
                      <i className="material-icons font-sm">mode_comment</i>
                      { this.getRepliesCount( idx ) }
                    </a>
                    &nbsp;
                    <a className="text-black-50 font-sm"><i
                      className="material-icons font-sm">thumb_up</i> Like</a>
                  </Col>
                </Row>
              </Col>
              { this.renderTextEditor( this.state.editor === comment[ 'comment_id' ] ) }
              { this.renderReplies( idx, comment[ 'comment_id' ] ) }
            </ListGroupItem>
          </div>
        );
    });
    return data;
  }

  renderReplies = ( index, id ) => {
    let data = [];
    this.state.comments[index]['replies'].forEach((reply,idx)=>{
      data.push(
        <Col sm={ "12" } key={idx}>
          <div className="callout">
            <small className="text-muted">
              <Ripple unbounded>
                  <span className="button"
                        onClick={ () => this.setState( { editor: id } ) }>
                    <i className="material-icons font-sm">reply</i>
                  </span>
              </Ripple>
              &nbsp;
              <a className="text-info" onClick={ () => {
                // this.props.onProfileClick(reply[ 'username' ]);
                localStorage.setItem("visiting_profile",reply[ 'username' ])}
              }>@{ reply[ 'username' ] }</a>
              &nbsp;
              <TimeAgo date={ reply[ 'date_created' ] }/>
            </small>
            <br/>
            <span>
                <div dangerouslySetInnerHTML={ { __html: reply[ 'reply' ] } }/>
              </span>
          </div>
        </Col>
      );
    });
    return data;
  }

  renderTextEditor = ( isActive ) => {
    if ( isActive )
      return (
        <ListGroupItem>
          <Container>
            <TextEditor onSubmit={ (this.state.editor === -1)?this.postComment:this.postReply }/>
          </Container>
        </ListGroupItem>
      );
    else return null;
  }

  renderTitle = () => {
    return (
      <div>
        <ListGroupItem>
          <Col xs={ "12" }>
            {/*<Row>*/}
              {/*<CliqueLink onClick={ this.props.onCliqueClick }*/}
                           {/*value={ this.state.posts }/>*/}
              {/*&nbsp;*/}
              {/*<ProfileLink onClick={ this.props.onProfileClick }*/}
                           {/*value={ this.state.posts }/>*/}
            {/*</Row>*/}
            <Row>
              <span className="font-lg">{ this.state.posts[ 'post_title' ] }<br/></span>
            </Row>
            <Row>
              <i className="material-icons font-sm">mode_comment</i>&nbsp;
              <span onClick={ () => this.setState( { editor: -1 } ) }
                    className="font-xs">{ this.getCommentsCount() }<br/></span>
            </Row>
          </Col>
        </ListGroupItem>
        { this.renderTextEditor( this.state.editor === -1 ) }
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

export default PostComponent;
