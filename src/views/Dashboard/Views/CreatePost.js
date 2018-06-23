import React, { Component } from 'react';
import {
  Col, Container, Input, ListGroupItem, Row
} from 'reactstrap';
import axios from "axios/index";
import TextEditor from "./Components/TextEditor";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Card } from "reactstrap";

const options = [
  // ...
  { value: 'Stanford University', label: 'Stanford' },
  // ...
];

class CreatePost extends Component {

  constructor( props ) {
    super( props );

    this.post = this.post.bind( this );
  }

  post() {

  }

  componentWillMount() {

  }

  renderTextEditor() {
    return (
      <ListGroupItem>
        <Container>
          <TextEditor onSubmit={ this.post }/>
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
                     placeholder="Title"/>
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
