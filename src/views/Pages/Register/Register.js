import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import axios from 'axios';
import React from 'react';
import FacebookLoginButton from "./ThirdPartyLogin/FacebookLoginButton";
import GoogleLoginButton from "./ThirdPartyLogin/GoogleLoginButton";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:{
        value:'',
        valid:-1
      },
      password:{
        value:'',
        valid:-1
      },
      confirm_password:{
        value:'',
        valid:-1
      },
      email:{
        value:'',
        valid:-1
      },
      state:"OK"
    };
    this.create = this.create.bind(this);
    this.renderConfirmPassword  = this.renderConfirmPassword.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
    this.renderEmail = this.renderEmail.bind(this);
    this.renderUsername = this.renderUsername.bind(this);
  }

  setValid(state, value){
    let _state = state;
    _state.valid = value;
    this.setState({state:_state});
  }

  setValue(state, value){
    let _state = state;
    _state.value = value;
    this.setState({state:_state});
  }

  create(evt){
    if(this.state.password.value !== this.state.confirm_password.value){
      this.setValid(this.state.password,0);
      this.setValid(this.state.confirm_password,0);
    }
    else{
      this.setValid(this.state.password,1);
      this.setValid(this.state.confirm_password,1);

      evt.preventDefault();
      return axios.post(`http://localhost:8000/index.php/api/user_master/`,
        {
          username: this.state.username.value,
          password: this.state.password.value,
          email: this.state.email.value
        })
        .then(res => {
          if(res.data === "SUCCESS"){

          }
          else if(res.data === "FAILED"){
          }
        })
        .catch(error => {
          console.log(error)
        });
    }
  }


  renderUsername(){
    return (
      <FormGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"/>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text"
                 value={this.state.username.value}
                 valid={(this.state.username.valid === 1)?true:null}
                 invalid={(this.state.username.valid === 0)?true:null}
                 onChange={evt => {
                   this.setValue(this.state.username,evt.target.value);
                   this.setValid(this.state.username,-1);
                 }}
                 onBlur={ evt => {
                   if(evt.target.value !== ''){
                     axios.post('http://localhost:8000/index.php/api/user_master/check_username',
                       { username: this.state.username.value })
                       .then(res => {
                         if(res.data === "SUCCESS")
                           this.setValid(this.state.username,1);
                         else if(res.data === "FAILED")
                           this.setValid(this.state.username,0);
                       })
                       .catch(error => {
                         console.log(error)
                       });
                   }
                   else{
                     this.setValid(this.state.username,0);
                   }
                 }}
                 placeholder="Username"/>
        </InputGroup>
      </FormGroup>
    );
  }

  renderEmail(){
    return(
      <FormGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input type="text" value={this.state.email.value}
                 valid={(this.state.email.valid === 1)?true:null}
                 invalid={(this.state.email.valid === 0)?true:null}
                 onChange={evt => {
                   this.setValid(this.state.email,-1);
                   this.setValue(this.state.email,evt.target.value);
                 }}
                 onBlur={ evt => {
                   axios.post(`http://localhost:8000/index.php/api/user_master/check_email`
                     , { email: this.state.email.value })
                     .then(res => {
                       if(res.data === "SUCCESS"){
                         this.setValid(this.state.email,1);
                       }
                       else if(res.data === "FAILED"){
                         this.setValid(this.state.email,0);
                       }
                     })
                     .catch(error => {
                       console.log(error)
                     });
                 }
                 }
                 placeholder="Email" />
        </InputGroup>
      </FormGroup>
    );
  }

  renderPassword(){
    return (
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password"
               value={this.state.password.value}
               invalid={(this.state.password.valid === 0)?true:null}
               onChange={evt => {
                 this.setValid(this.state.password,-1);
                 this.setValue(this.state.password,evt.target.value);
               }}
               placeholder="Password" />
      </InputGroup>
    );
  }

  renderConfirmPassword(){
    return (
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" value={this.state.confirm_password.value}
               invalid={(this.state.password.valid === 0)?true:null}
               onChange={evt => {
                 this.setValid(this.state.confirm_password,-1);
                 this.setValue(this.state.confirm_password,evt.target.value);
               }}
               placeholder="Repeat password" />
      </InputGroup>
    );
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

                  {this.renderUsername()}

                  {this.renderEmail()}

                  {this.renderPassword()}

                  {this.renderConfirmPassword()}

                  <Button color="success" onClick={this.create} block>Create Account</Button>
                  <Button color="link" onClick={this.create} block>Already have an account? Click here to Sign in!</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <FacebookLoginButton/>
                    </Col>
                    <Col xs="12" sm="6">
                      <GoogleLoginButton/>
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
