import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { Redirect } from "react-router-dom";
import axios from "axios/index";

class EditPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      new_password:'haha',
      old_password:'',
      re_password:'hehe',
      password_checker:[],
      submit: false
    };
    this.tester = this.tester.bind(this);
    this.renderNewPassword = this.renderNewPassword.bind(this);
    this.renderOldPassword = this.renderOldPassword.bind(this);
    this.renderConfirmationPassword = this.renderConfirmationPassword.bind(this);
    this.submit = this.submit.bind();
  }
  componentWillMount() {
    axios.get( `http://project-clique.herokuapp.com/index.php/api/user_master/getpassword/` + localStorage.getItem("username") )
      .then( response => {
        let data=[];
        response.data.map( ( content, index ) => data[ index ] = content );
        this.setState( { password_checker: data } );
      } );
  }
  tester()
  {
    console.log("Password Checker = " + this.state.password_checker['password'] + ' ' + localStorage.getItem("username"));

    if(this.state.new_password ===  this.state.re_password )
    return(
      <div>
        <p>Password baru sama!</p>
        {/*<p>Password_checker: {this.state.password_checker}</p>*/}
        <p>{this.state.old_password}</p>
        <p>{this.state.new_password}</p>
        <p>{this.state.re_password}</p>
      </div>
    )

  }

  renderNewPassword()
  {
    return(
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" placeholder="Enter new password"
               // value={this.state.new_password}
               onChange={evt =>this.setState({new_password:evt.target.value})}/>
      </InputGroup>
    );
  }

  renderOldPassword()
  {
    return(
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"/>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" placeholder="Enter old password"
          // value={this.state.old_password}
               onChange={evt =>this.setState({old_password:evt.target.value})}/>
      </InputGroup>

    );
  }

  renderConfirmationPassword()
  {
    return (
      <InputGroup className="mb-4">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="icon-lock"/>
        </InputGroupText>
      </InputGroupAddon>
      <Input type="password" placeholder="Re-enter new password"
        // value={this.state.re_password}
             onChange={evt =>this.setState({re_password:evt.target.value})}/>
    </InputGroup>
    );
  }

  submit()
  {

  }

  render() {
    if ( this.state.submit ) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Change Password</h1>
                  {/*<p className="text-muted">Sign In to your account</p>*/}

                  {this.renderOldPassword()}
                  {this.renderNewPassword()}
                  {this.renderConfirmationPassword()}


                  {this.tester()}
                  <Row>
                    <Col xs="6">
                      <Button color="primary" onClick={this.submit} className="px-4">Submit</Button>
                    </Col>

                  </Row>

                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditPassword;
