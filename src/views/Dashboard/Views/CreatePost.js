import React, { Component } from 'react';
import {
  Col, Container, Input, ListGroupItem, Row
} from 'reactstrap';
import TextEditor from "./Components/TextEditor";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Card } from "reactstrap";
import API from "../../../api";

const options = [
  // ...
  { value: 'gaming', label: 'gaming', postTitle: 'title'},
  // ...
];

class CreatePost extends Component {

  constructor( props ) {
    super( props );

    this.title = "";

    this.submitPost = this.submitPost.bind( this );
    this.setPostTitle = this.setPostTitle.bind(this);
  }

  setPostTitle(content){
    this.title = content.target.value;
    console.log(this.title);
  }

  submitPost( content ){
    console.log("Clique: " + localStorage.getItem("visiting_clique"));
    console.log("User: " + localStorage.getItem("username"));
    console.log("Post Title: " + this.title);
    console.log("Post Content: " + content);

    API.post( `post_master/insert`,
      {
        content: content,
        username: localStorage.getItem("username"),
        title: this.title,
        clique_name: localStorage.getItem("visiting_clique"),
      } )
      .then( res => {

      } )
      .catch( error => {
        console.log( error );
      } );
    // return API.post( `comment_master/insert`,
    //   {
    //     comment: content,
    //     username: localStorage.getItem("username"),
    //     post_id: this.props.id
    //   } )
    //   .then( res => {
    //     if ( res.data === "SUCCESS" ) {
    //       API.post( `comment_master/`,{
    //         id:this.props.id
    //       } )
    //         .then( response => {
    //           let data = [];
    //           response.data.map( ( content, index ) => data[ index ] = content );
    //           this.setState( { comments: data } );
    //         } );
    //     }
    //     else if ( res.data === "FAILED" ) {
    //
    //     }
    //   } )
    //   .catch( error => {
    //     console.log( error );
    //   } );
  }

  componentWillMount() {

  }

  renderTextEditor() {
    return (
      <ListGroupItem>
        <Container>
          <TextEditor onSubmit={ this.submitPost }/>
        </Container>
      </ListGroupItem>
    );
  }

  renderTitle() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col>
              <h2>Create a post</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={ "4" }>
              <Select
                placeholder="Select a Clique"
                name="Clique"
                value="one"
                options={ options }
                onChange={ val => console.log( val ) }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input type="text"
                     placeholder="Title"
                      onChange={this.setPostTitle}/>
            </Col>
          </Row>
          <Row>
            <Col>
              { this.renderTextEditor() }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={ "1" }/>
          <Col xs={ "10" } className="center">
            <Card>
              <Container fluid>
                { this.renderTitle() }
              </Container>
            </Card>
          </Col>
          <Col xs={ "1" }/>
        </Row>
      </Container>

    );
  }
}

export default CreatePost;
