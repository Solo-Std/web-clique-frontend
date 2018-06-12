import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      confirm_password:'',
      email:''
    };
    this.submit = this.submit.bind(this);
  }

  submit(evt){
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };


    evt.preventDefault();
    console.log(user);
    return axios.post(`http://localhost:8000/index.php/api/user_master/`, { user })
      .then(res => {
        if(res === "SUCCESS"){
          console.log("SUCCESS");
        }
        else if(res === "FAILED"){
         console.log("FAILED");
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  test(){
    return axios.get('http://localhost:8000/index.php/api/user_master/')
      .then(res =>{
        console.log(res);
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
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
                    <Input type="text" value={this.state.username} onChange={evt => {this.setState({username:evt.target.value})}} placeholder="Username" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={this.state.email} onChange={evt => {this.setState({email:evt.target.value})}} placeholder="Email" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.password} onChange={evt => {this.setState({password:evt.target.value})}} placeholder="Password" />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.confirm_password} onChange={evt => {this.setState({confirm_password:evt.target.value})}} placeholder="Repeat password" />
                  </InputGroup>
                  <Button color="success" onClick={this.submit} block>Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" onClick={this.test} block><span>facebook</span></Button>
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
