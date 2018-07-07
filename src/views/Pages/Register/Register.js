import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row
} from 'reactstrap';
import API from "../../../api";
import React from 'react';
import FacebookLoginButton from "./ThirdPartyLogin/FacebookLoginButton";
import GoogleLoginButton from "./ThirdPartyLogin/GoogleLoginButton";
import TextField from "./TextField";
import { Redirect } from "react-router-dom";

export const validState = {
  NONE: 1,
  VALID: 2,
  EMPTY_STRING: 3,
  INVALID_FORMAT: 4,
  CONTAINS_WHITESPACE: 5,
  INSUFFICIENT_LENGTH: 6,
  UNEXPECTED_SYMBOLS: 7,
  NOT_AVAILABLE: 8,
  DIFFERENT_PASSWORD: 9
};

class Register extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: { value: '', valid: validState.NONE },
      password: { value: '', valid: validState.NONE },
      confirm_password: { value: '', valid: validState.NONE },
      email: { value: '', valid: validState.NONE },
      state: "OK",
      submit: false
    };
    this.create = this.create.bind( this );
    this.setValid = this.setValid.bind( this );
    this.setValue = this.setValue.bind( this );
    this.sendMail = this.sendMail.bind(this);
  }

  sendMail()
  {
    API.get('/user_master/sendmail/'+localStorage.getItem("email"));
  }

  setValid( state, value ) {
    let _state = state;
    _state.valid = value;
    this.setState( { state: _state } );
  }

  setValue( state, value ) {
    let _state = state;
    _state.value = value;
    this.setState( { state: _state } );
  }

  create( evt ) {
    if ( this.state.password.valid === validState.VALID &&
      this.state.confirm_password.valid === validState.VALID &&
      this.state.username.valid === validState.VALID &&
      this.state.email.valid === validState.VALID ) {
      evt.preventDefault();
      return API.post( `user_master/`,
        {
          username: this.state.username.value,
          password: this.state.password.value,
          email: this.state.email.value
        } )
        .then( res => {
          localStorage.setItem("session_token",res.data['__ci_last_regenerate']);
          localStorage.setItem("username",res.data['username']);
          localStorage.setItem("email",this.state.email);
          this.sendMail();
          this.setState( { submit: true } );
        } )
        .catch( error => {
          console.log( error );
        } );
    }
  }

  generateSubtitleText( state, text ) {
    switch ( state.valid ) {
      case validState.EMPTY_STRING:
        return ( <p className="text-danger"> { text } cannot be empty </p> );
      case validState.INVALID_FORMAT:
        return ( <p className="text-danger"> { text } format is invalid </p> );
      case validState.CONTAINS_WHITESPACE:
        return ( <p className="text-danger"> { text } cannot contain spaces </p> );
      case validState.INSUFFICIENT_LENGTH:
        if(state === this.state.password || state === this.state.confirm_password)
          return ( <p className="text-danger"> Password cannot be shorter than 6 characters </p> );
        else
          return ( <p className="text-danger"> { text } is too short </p> );
      case validState.UNEXPECTED_SYMBOLS:
        return ( <p className="text-danger"> Unexpected symbols found </p> );
      case validState.NOT_AVAILABLE:
        return ( <p className="text-danger"> { text } is already taken </p> );
      case validState.DIFFERENT_PASSWORD:
        return ( <p className="text-danger"> Password doesn't match </p> );
      default:
        return ( <p className="text-muted"> Create your account </p> );
    }
  }

  renderSubtitle() {
    if ( this.state.username.valid !== validState.VALID )
      return this.generateSubtitleText( this.state.username, "Username" );
    else if ( this.state.email.valid !== validState.VALID )
      return this.generateSubtitleText( this.state.email, "Email" );
    else if ( this.state.password.valid !== validState.VALID )
      return this.generateSubtitleText( this.state.password, "Password" );
    else if ( this.state.confirm_password.valid !== validState.VALID )
      return this.generateSubtitleText( this.state.confirm_password, "Repeat Password" );
    else
      return this.generateSubtitleText( this.state.username, "" );
  }

  render() {
    if ( this.state.submit ) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <div className="app flex-row align-items-center ">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  { this.renderSubtitle() }

                  <TextField type="text"
                             value={ this.state.username.value }
                             valid={ this.state.username.valid }
                             onChange={ evt => {
                               this.setValue( this.state.username, evt.target.value );
                               this.setValid( this.state.username, validState.NONE );
                             } }
                             onBlur={ ( evt ) => {
                               const whitespace = /^\S+$/;
                               const format = /^[a-z\d\-_]+$/i;
                               if ( evt.target.value.length < 4 )
                                 this.setValid( this.state.username, validState.INSUFFICIENT_LENGTH );
                               else if ( !whitespace.test( evt.target.value ) )
                                 this.setValid( this.state.username, validState.CONTAINS_WHITESPACE );
                               else if ( !format.test( evt.target.value ) )
                                 this.setValid( this.state.username, validState.INVALID_FORMAT );
                               else if ( evt.target.value === '' )
                                 this.setValid( this.state.username, validState.EMPTY_STRING );
                               else {
                                 this.setValid( this.state.username, validState.VALID );
                                 API.post( 'user_master/check_username',
                                   { username: this.state.username.value } )
                                   .then( res => {
                                     if ( res.data === "SUCCESS" )
                                       this.setValid( this.state.username, validState.VALID );
                                     else if ( res.data === "FAILED" )
                                       this.setValid( this.state.username, validState.NOT_AVAILABLE );
                                   } )
                                   .catch( error => {
                                     console.log( error );
                                   } );
                               }
                             } }
                             placeholder="Username"
                             icon="fa fa-user"/>

                  <TextField type="text"
                             value={ this.state.email.value }
                             valid={ this.state.email.valid }
                             onChange={ evt => {
                               this.setValid( this.state.email, validState.NONE );
                               this.setValue( this.state.email, evt.target.value );
                             } }
                             onBlur={ evt => {
                               const whitespace = /^\S+$/;
                               const format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
                               if ( evt.target.value === '' )
                                 this.setValid( this.state.email, validState.EMPTY_STRING );
                               else if ( !whitespace.test( evt.target.value ) )
                                 this.setValid( this.state.email, validState.CONTAINS_WHITESPACE );
                               else if ( !format.test( evt.target.value ) )
                                 this.setValid( this.state.email, validState.INVALID_FORMAT );
                               else {
                                 this.setValid( this.state.email, validState.VALID );
                                 API.post( `user_master/check_email`
                                   , { email: this.state.email.value } )
                                   .then( res => {
                                     if ( res.data === "SUCCESS" ) {
                                       this.setValid( this.state.email, validState.VALID );
                                     }
                                     else if ( res.data === "FAILED" ) {
                                       this.setValid( this.state.email, validState.NOT_AVAILABLE );
                                     }
                                   } )
                                   .catch( error => {
                                     console.log( error );
                                   } );
                               }
                             }
                             }
                             placeholder="Email"
                             icon="fa fa-at"/>

                  <TextField type="password"
                             value={ this.state.password.value }
                             valid={ this.state.password.valid }
                             onChange={ evt => {
                               this.setValid( this.state.password, validState.NONE );
                               this.setValue( this.state.password, evt.target.value );
                             } }
                             onBlur={ evt => {
                               const whitespace = /^\S+$/;
                               if ( this.state.password.value === '' )
                                 this.setValid( this.state.password, validState.EMPTY_STRING );
                               else if ( this.state.password.value.length < 6 )
                                 this.setValid( this.state.password, validState.INSUFFICIENT_LENGTH );
                               else if ( !whitespace.test( evt.target.value ) )
                                 this.setValid( this.state.password, validState.CONTAINS_WHITESPACE );
                               else
                                 this.setValid( this.state.password, validState.VALID );
                             } }
                             placeholder="Password"
                             icon="fa fa-lock"/>

                  <TextField type="password"
                             value={ this.state.confirm_password.value }
                             valid={ this.state.confirm_password.valid }
                             onChange={ evt => {
                               this.setValid( this.state.confirm_password, validState.NONE );
                               this.setValue( this.state.confirm_password, evt.target.value );
                             } }
                             onBlur={ evt => {
                               const whitespace = /^\S+$/;
                               if ( !whitespace.test( evt.target.value ) )
                                 this.setValid( this.state.confirm_password, validState.CONTAINS_WHITESPACE );
                               else if ( this.state.confirm_password.value === '' )
                                 this.setValid( this.state.confirm_password, validState.EMPTY_STRING );
                               else if ( this.state.password.value !== this.state.confirm_password.value )
                                 this.setValid( this.state.confirm_password, validState.DIFFERENT_PASSWORD );
                               else
                                 this.setValid( this.state.confirm_password, validState.VALID );
                             } }
                             placeholder="Repeat Password"
                             icon="fa fa-lock"/>

                  <Button color="success" onClick={this.create } block>Create Account</Button>
                  <Button color="link" onClick={ this.create } block>Sign in</Button>
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
