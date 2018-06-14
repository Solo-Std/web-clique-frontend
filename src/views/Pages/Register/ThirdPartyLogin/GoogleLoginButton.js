import axios from "axios/index";
import React from 'react';
import {GoogleLogin} from "react-google-login";


class GoogleLoginButton extends React.Component{
  constructor(props){
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    return axios.post(`http://localhost:8000/index.php/api/user_master/gp_login`,
      {
        username: response.profileObj.googleId,
        password: response.profileObj.googleId,
        google_id: response.profileObj.googleId,
        email: response.profileObj.email,
        token: response.accessToken
      })
      .then(res => {
        console.log(res.data);
        if (res.data === "SUCCESS") {

        }
        else if (res.data === "FAILED") {
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  render(){
    return (
      <GoogleLogin
        className="btn-google-plus fa fa-google-plus"
        clientId="709282008481-2140ljc3dd865ld0rp818lklnh381di8.apps.googleusercontent.com"
        buttonText=" Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default GoogleLoginButton;
