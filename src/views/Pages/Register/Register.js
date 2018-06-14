import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import React from 'react';
import FacebookLoginButton from "./ThirdPartyLogin/FacebookLoginButton";
import GoogleLoginButton from "./ThirdPartyLogin/GoogleLoginButton";
import TextField from "./TextField";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:{ value:'', valid:-1 },
      password:{ value:'', valid:-1 },
      confirm_password:{ value:'', valid:-1 },
      email:{ value:'', valid:-1 },
      state:"OK"
    };
    this.create = this.create.bind(this);
    this.setValid = this.setValid.bind(this);
    this.setValue = this.setValue.bind(this);
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
    if(this.state.password.valid === 1 &&
        this.state.confirm_password.valid === 1 &&
        this.state.username.valid === 1 &&
        this.state.email.valid === 1){
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

  renderSubtitle(){
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(this.state.username.valid === 0){
      if(this.state.username.value === '')
        return ( <p className="text-danger"> Username cannot be empty </p> );
      else
        return ( <p className="text-danger"> Username is taken </p> );
    }
    else if(this.state.email.valid === 0){
      if(this.state.email.value === '')
        return ( <p className="text-danger" > Email cannot be empty </p> );
      else if(!email_regex.test(this.state.email.value))
        return ( <p className="text-danger" > Email format is invalid </p> );
      else
        return ( <p className="text-danger" > Email is taken </p> );
    }
    else if(this.state.password.valid === 0){
      if(this.state.password.value === this.state.confirm_password.value)
        return ( <p className="text-danger " > Password cannot be empty </p> );
      else
        return ( <p className="text-danger" > Different Password </p> );
    }
    else if(this.state.confirm_password.valid === 0){
      return ( <p className="text-danger" > Repeat Password cannot be empty </p> );
    }
    else {
      return ( <p className="text-muted"> Create your account </p> );
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center ">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  {this.renderSubtitle()}

                  <TextField type="text"
                             value={ this.state.username.value }
                             valid={ this.state.username.valid }
                             onChange={ evt =>{
                               this.setValue(this.state.username,evt.target.value);
                               this.setValid(this.state.username,-1);
                             } }
                             onBlur={ (evt) => {
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
                             } }
                             placeholder="Username"
                             icon="fa fa-user"/>

                  <TextField type="text"
                             value={ this.state.email.value }
                             valid={ this.state.email.valid }
                             onChange={evt => {
                               this.setValid(this.state.email,-1);
                               this.setValue(this.state.email,evt.target.value);
                             }}
                             onBlur={ evt => {
                               const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                               if(!email_regex.test(evt.target.value)){
                                 this.setValid(this.state.email,0);
                               }
                               else if(evt.target.value === ''){
                                 this.setValid(this.state.email,0);
                               }
                               else{
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
                             }
                             placeholder="Email"
                             icon="fa fa-at"/>

                  <TextField type="password"
                             value={ this.state.password.value }
                             valid={ this.state.password.valid }
                             onChange={evt => {
                               this.setValid(this.state.password,-1);
                               this.setValue(this.state.password,evt.target.value);
                             }}
                             onBlur={evt => {
                               if(this.state.password.value === '')
                                 this.setValid(this.state.password,0);
                             }}
                             placeholder="Password"
                             icon="fa fa-lock"/>

                  <TextField type="password"
                             value={ this.state.confirm_password.value }
                             valid={ this.state.confirm_password.valid }
                             onChange={evt => {
                               this.setValid(this.state.confirm_password,-1);
                               this.setValue(this.state.confirm_password,evt.target.value);
                             }}
                             onBlur={evt => {
                               if(this.state.confirm_password.value === '')
                                 this.setValid(this.state.confirm_password,0);
                             }}
                             placeholder="Repeat Password"
                             icon="fa fa-lock"/>

                  <Button color="success" onClick={this.create} block>Create Account</Button>
                  <Button color="link" onClick={this.create} block>Sign in</Button>
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
