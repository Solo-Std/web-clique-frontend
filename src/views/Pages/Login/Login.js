import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import axios from "axios/index";
import FacebookLoginButton from "../Register/ThirdPartyLogin/FacebookLoginButton";
import GoogleLoginButton from "../Register/ThirdPartyLogin/GoogleLoginButton";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    };
    this.renderUsername = this.renderUsername.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(){
    console.log(this.state);
    axios.post('http://project-clique.herokuapp.com/index.php/api/user_master/login',
      {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if(res.data === "SUCCESS")
          console.log("SUCCESS");
        else if(res.data === "FAILED")
          console.log("FAILED");

      })
      .catch(error => {
        console.log(error)
      });
  }

  renderUsername(){
    return (
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="Username"
               value={this.state.username}
               onChange={evt => this.setState({username : evt.target.value})}/>
      </InputGroup>
    );
  }

  renderPassword(){
    return (
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" placeholder="Password"
               value={this.state.password}
               onChange={evt =>this.setState({password:evt.target.value})}/>
      </InputGroup>
    );
  }

  responseFacebook(response) {
    return axios.post(`http://project-clique.herokuapp.com/index.php/api/user_master/fb_login`, {
      username: response.id,
      password: response.id,
      email: response.email,
      token: response.accessToken
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

  responseGoogle(response) {
    return axios.post(`http://project-clique.herokuapp.com/index.php/api/user_master/gp_login`,
      {
        username: response.profileObj.googleId,
        password: response.profileObj.googleId,
        email: response.profileObj.email,
        token: response.accessToken
      })
      .then(res => {
        console.log(res.data);
        if(res.data === "SUCCESS"){

        }
        else if(res.data === "FAILED"){
        }
      })
      .catch(error => {
        console.log(error)
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
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>

                  {this.renderUsername()}

                  {this.renderPassword()}

                  <Row>
                    <Col xs="6">
                      <Button color="primary" onClick={this.submit} className="px-4">Login</Button>
                    </Col>
                    <Col xs="6" className="text-right">
                      <Button color="link" className="px-0">Forgot password?</Button>
                    </Col>
                  </Row>

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

export default Login;
