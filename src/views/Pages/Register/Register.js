import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import axios from 'axios';
import * as React from "react/cjs/react.development";

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
      }
    };
    this.submit = this.submit.bind(this);
  }

  submit(evt){
    const user = {
      username: this.state.username.value,
      password: this.state.password.value,
      email: this.state.email.value
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

                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.username.value}
                             valid={(this.state.username.valid === 1)?true:null}
                             invalid={(this.state.username.valid === 0)?true:null}
                             onChange={evt => {
                               let _username = this.state.username;
                               _username.value = evt.target.value;
                               _username.valid = -1;
                               this.setState({username:_username});
                             }}
                             onBlur={ evt => {
                               const user = {
                                 username: this.state.username.value
                               };
                               axios.post(`http://localhost:8000/index.php/api/user_master/check_username`, { user })
                                 .then(res => {
                                   if(res.data === "SUCCESS"){
                                     let _username = this.state.username;
                                     _username.valid = 1;
                                     this.setState({username:_username});
                                   }
                                   else if(res.data === "FAILED"){
                                     let _username = this.state.username;
                                     _username.valid = 0;
                                     this.setState({username:_username});
                                   }
                                 })
                                 .catch(error => {
                                   console.log(error)
                                 });
                               }
                             }
                             placeholder="Username" />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.email.value}
                             valid={(this.state.email.valid === 1)?true:null}
                             invalid={(this.state.email.valid === 0)?true:null}
                             onChange={evt => {
                               let _email = this.state.email;
                               _email.value = evt.target.value;
                               _email.valid = -1;
                               this.setState({email:_email});
                             }}
                             onBlur={ evt => {
                               const user = {
                                 email: this.state.email.value
                               };
                               axios.post(`http://localhost:8000/index.php/api/user_master/check_email`, { user })
                                 .then(res => {
                                   if(res.data === "SUCCESS"){
                                     let _email = this.state.email;
                                     _email.valid = 1;
                                     this.setState({email:_email});
                                   }
                                   else if(res.data === "FAILED"){
                                     let _email = this.state.email;
                                     _email.valid = 0;
                                     this.setState({email:_email});
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

                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.password.value} onChange={evt => {this.setState({password:evt.target.value})}} placeholder="Password" />
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" value={this.state.confirm_password.value} onChange={evt => {this.setState({confirm_password:evt.target.value})}} placeholder="Repeat password" />
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
