import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      confirm_password:'',
      email:''
    }
  }

  createAccount(){
    if(this.state.password !== this.state.confirm_password){
      return;
    }
    return fetch('http://localhost/create_account/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
        'email': this.state.email
      })
    })
  }

  update(state, evt) {
    this.setState({
      state: evt.target.value
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={this.state.username} onChange={evt => this.update(this.state.username,evt)} placeholder="Username" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={this.state.email} onChange={evt => this.update(this.state.email,evt)} placeholder="Email" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.password} onChange={evt => this.update(this.state.password,evt)} placeholder="Password" />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.confirm_password} onChange={evt => this.update(this.state.confirm_password,evt)} placeholder="Repeat password" />
                  </InputGroup>
                  <Button color="success" onClick={this.createAccount} block>Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-google-plus" block><span>Google+</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
